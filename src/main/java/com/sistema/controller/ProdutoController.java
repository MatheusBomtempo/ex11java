package com.sistema.controller;

import com.sistema.dto.ProdutoDTO;
import com.sistema.model.*;
import com.sistema.repository.CategoriaRepository;
import com.sistema.repository.ProdutoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;
import java.util.List;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import java.math.BigDecimal;

@RestController
@RequestMapping("/api/produtos")
public class ProdutoController {
    private static final Logger logger = LoggerFactory.getLogger(ProdutoController.class);

    @Autowired
    private ProdutoRepository produtoRepository;

    @Autowired
    private CategoriaRepository categoriaRepository;

    @GetMapping
    public List<Produto> listarTodos() {
        return produtoRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Produto> buscarPorId(@PathVariable Long id) {
        return produtoRepository.findById(id)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Produto> criar(@Valid @RequestBody ProdutoDTO dto) {
        try {
            logger.info("Criando produto: {}", dto);
            
            if (dto.getCategoriaCodigo() == null) {
                logger.error("Código da categoria não pode ser nulo");
                return ResponseEntity.badRequest().build();
            }

            Categoria categoria = categoriaRepository.findById(dto.getCategoriaCodigo())
                .orElseThrow(() -> {
                    logger.error("Categoria não encontrada com código: {}", dto.getCategoriaCodigo());
                    return new RuntimeException("Categoria não encontrada");
                });

            Produto produto;
            switch (dto.getTipo().toUpperCase()) {
                case "ALIMENTICIO":
                    produto = new ProdutoAlimenticio();
                    break;
                case "ELETRONICO":
                    produto = new ProdutoEletronico();
                    break;
                case "LIMPEZA":
                    produto = new ProdutoLimpeza();
                    break;
                default:
                    logger.error("Tipo de produto inválido: {}", dto.getTipo());
                    return ResponseEntity.badRequest().build();
            }

            produto.setNome(dto.getNome());
            produto.setDescricao(dto.getDescricao());
            produto.setPrecoCusto(dto.getPrecoCusto() != null ? dto.getPrecoCusto() : BigDecimal.ZERO);
            produto.setPrecoVenda(dto.getPrecoVenda() != null ? dto.getPrecoVenda() : BigDecimal.ZERO);
            produto.setQuantidadeEstoque(dto.getQuantidadeEstoque() != null ? dto.getQuantidadeEstoque() : 0);
            produto.setCategoria(categoria);

            Produto produtoSalvo = produtoRepository.save(produto);
            logger.info("Produto criado com sucesso: {}", produtoSalvo);
            return ResponseEntity.ok(produtoSalvo);
        } catch (Exception e) {
            logger.error("Erro ao criar produto", e);
            return ResponseEntity.internalServerError().build();
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<Produto> atualizar(@PathVariable Long id, @Valid @RequestBody ProdutoDTO dto) {
        try {
            logger.info("Atualizando produto {}: {}", id, dto);
            
            return produtoRepository.findById(id)
                .map(existente -> {
                    Categoria categoria = categoriaRepository.findById(dto.getCategoriaCodigo())
                        .orElseThrow(() -> {
                            logger.error("Categoria não encontrada com código: {}", dto.getCategoriaCodigo());
                            return new RuntimeException("Categoria não encontrada");
                        });

                    existente.setNome(dto.getNome());
                    existente.setDescricao(dto.getDescricao());
                    existente.setPrecoCusto(dto.getPrecoCusto() != null ? dto.getPrecoCusto() : BigDecimal.ZERO);
                    existente.setPrecoVenda(dto.getPrecoVenda() != null ? dto.getPrecoVenda() : BigDecimal.ZERO);
                    existente.setQuantidadeEstoque(dto.getQuantidadeEstoque() != null ? dto.getQuantidadeEstoque() : 0);
                    existente.setCategoria(categoria);

                    Produto produtoAtualizado = produtoRepository.save(existente);
                    logger.info("Produto atualizado com sucesso: {}", produtoAtualizado);
                    return ResponseEntity.ok(produtoAtualizado);
                })
                .orElseGet(() -> {
                    logger.error("Produto não encontrado com código: {}", id);
                    return ResponseEntity.notFound().build();
                });
        } catch (Exception e) {
            logger.error("Erro ao atualizar produto", e);
            return ResponseEntity.internalServerError().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Long id) {
        try {
            logger.info("Excluindo produto com código: {}", id);
            
            return produtoRepository.findById(id)
                .map(produto -> {
                    produtoRepository.delete(produto);
                    logger.info("Produto excluído com sucesso");
                    return ResponseEntity.ok().<Void>build();
                })
                .orElseGet(() -> {
                    logger.error("Produto não encontrado com código: {}", id);
                    return ResponseEntity.notFound().build();
                });
        } catch (Exception e) {
            logger.error("Erro ao excluir produto", e);
            return ResponseEntity.internalServerError().build();
        }
    }

    @GetMapping("/buscar")
    public List<Produto> buscarPorNome(@RequestParam String nome) {
        return produtoRepository.findByNomeContainingIgnoreCase(nome);
    }

    @GetMapping("/categoria/{codigo}")
    public List<Produto> buscarPorCategoria(@PathVariable Long codigo) {
        return produtoRepository.findByCategoriaCodigo(codigo);
    }

    @GetMapping("/estoque-baixo")
    public List<Produto> buscarEstoqueBaixo(@RequestParam(defaultValue = "5") Integer quantidade) {
        return produtoRepository.findByQuantidadeEstoqueLessThan(quantidade);
    }
} 