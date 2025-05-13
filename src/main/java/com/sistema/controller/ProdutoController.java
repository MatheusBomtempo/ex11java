package com.sistema.controller;

import com.sistema.model.Produto;
import com.sistema.repository.ProdutoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/produtos")
public class ProdutoController {

    @Autowired
    private ProdutoRepository produtoRepository;

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
    public Produto criar(@Valid @RequestBody Produto produto) {
        return produtoRepository.save(produto);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Produto> atualizar(@PathVariable Long id, @Valid @RequestBody Produto produto) {
        return produtoRepository.findById(id)
            .map(existente -> {
                produto.setCodigo(id);
                return ResponseEntity.ok(produtoRepository.save(produto));
            })
            .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Long id) {
        return produtoRepository.findById(id)
            .map(produto -> {
                produtoRepository.delete(produto);
                return ResponseEntity.ok().<Void>build();
            })
            .orElse(ResponseEntity.notFound().build());
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