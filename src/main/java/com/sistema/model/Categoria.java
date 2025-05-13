package com.sistema.model;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
public class Categoria {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long codigo;
    
    @Column(nullable = false)
    private String descricao;
    
    @Column(nullable = false)
    private String nome;
} 