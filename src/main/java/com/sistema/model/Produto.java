package com.sistema.model;

import jakarta.persistence.*;
import lombok.Data;
import java.math.BigDecimal;

@Data
@Entity
@Inheritance(strategy = InheritanceType.JOINED)
public abstract class Produto {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long codigo;
    
    @Column(nullable = false)
    private String nome;
    
    @Column(length = 500)
    private String descricao;
    
    @Column(nullable = false)
    private BigDecimal precoCusto;
    
    @Column(nullable = false)
    private BigDecimal precoVenda;
    
    @Column(nullable = false)
    private Integer quantidadeEstoque;
    
    @ManyToOne
    @JoinColumn(name = "categoria_id", nullable = false)
    private Categoria categoria;
    
    public abstract BigDecimal calcularLucro();
    public abstract boolean verificarDisponibilidade();
} 