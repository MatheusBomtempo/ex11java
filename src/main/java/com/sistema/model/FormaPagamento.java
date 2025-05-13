package com.sistema.model;

import jakarta.persistence.*;
import lombok.Data;
import java.math.BigDecimal;

@Data
@Entity
@Inheritance(strategy = InheritanceType.JOINED)
public abstract class FormaPagamento {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false)
    private String tipo;
    
    @Column(nullable = false)
    private BigDecimal valorPago;
    
    public abstract boolean processarPagamento();
    public abstract String emitirComprovante();
} 