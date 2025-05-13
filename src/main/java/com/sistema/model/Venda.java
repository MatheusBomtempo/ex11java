package com.sistema.model;

import jakarta.persistence.*;
import lombok.Data;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Data
@Entity
public class Venda {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @ManyToMany
    @JoinTable(
        name = "venda_produto",
        joinColumns = @JoinColumn(name = "venda_id"),
        inverseJoinColumns = @JoinColumn(name = "produto_id")
    )
    private List<Produto> produtos = new ArrayList<>();
    
    @ManyToOne
    @JoinColumn(name = "cliente_id", nullable = false)
    private Cliente cliente;
    
    @OneToOne
    @JoinColumn(name = "forma_pagamento_id", nullable = false)
    private FormaPagamento formaPagamento;
    
    @Column(nullable = false)
    private BigDecimal valorTotal;
    
    @Column(name = "data_venda")
    private LocalDateTime dataVenda;
    
    public void adicionarProduto(Produto produto) {
        produtos.add(produto);
        calcularTotal();
    }
    
    public void calcularTotal() {
        this.valorTotal = produtos.stream()
            .map(Produto::getPrecoVenda)
            .reduce(BigDecimal.ZERO, BigDecimal::add);
    }
    
    public void aplicarDesconto(BigDecimal percentualDesconto) {
        BigDecimal desconto = valorTotal.multiply(percentualDesconto)
            .divide(new BigDecimal("100"));
        this.valorTotal = valorTotal.subtract(desconto);
    }
    
    public boolean finalizarVenda() {
        if (produtos.isEmpty() || cliente == null || formaPagamento == null) {
            return false;
        }
        
        this.dataVenda = LocalDateTime.now();
        return formaPagamento.processarPagamento();
    }
} 