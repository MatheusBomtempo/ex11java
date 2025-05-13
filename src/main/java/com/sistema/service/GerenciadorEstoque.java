package com.sistema.service;

import com.sistema.model.Produto;
import com.sistema.model.Venda;
import org.springframework.stereotype.Service;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class GerenciadorEstoque {
    
    private List<Produto> listaProdutos = new ArrayList<>();
    private List<Venda> listaVendas = new ArrayList<>();
    
    public void adicionarProduto(Produto produto) {
        listaProdutos.add(produto);
    }
    
    public void removerProduto(Long codigo) {
        listaProdutos.removeIf(p -> p.getCodigo().equals(codigo));
    }
    
    public Optional<Produto> buscarProduto(Long codigo) {
        return listaProdutos.stream()
            .filter(p -> p.getCodigo().equals(codigo))
            .findFirst();
    }
    
    public void atualizarProduto(Produto produto) {
        listaProdutos.removeIf(p -> p.getCodigo().equals(produto.getCodigo()));
        listaProdutos.add(produto);
    }
    
    public String gerarRelatorio() {
        StringBuilder relatorio = new StringBuilder();
        relatorio.append("Relatório de Estoque\n");
        relatorio.append("===================\n\n");
        
        for (Produto produto : listaProdutos) {
            relatorio.append(String.format("Produto: %s\n", produto.getNome()));
            relatorio.append(String.format("Quantidade em estoque: %d\n", produto.getQuantidadeEstoque()));
            relatorio.append(String.format("Preço de venda: R$ %.2f\n\n", produto.getPrecoVenda()));
        }
        
        return relatorio.toString();
    }
    
    public void registrarVenda(Venda venda) {
        listaVendas.add(venda);
        // Atualizar estoque
        venda.getProdutos().forEach(produto -> {
            produto.setQuantidadeEstoque(produto.getQuantidadeEstoque() - 1);
            atualizarProduto(produto);
        });
    }
} 