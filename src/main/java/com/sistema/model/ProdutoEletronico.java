package com.sistema.model;

import jakarta.persistence.Entity;
import lombok.Data;
import lombok.EqualsAndHashCode;
import java.math.BigDecimal;

@Data
@Entity
@EqualsAndHashCode(callSuper = true)
public class ProdutoEletronico extends Produto {
    
    private String marca;
    private String modelo;
    private String garantia;
    
    @Override
    public BigDecimal calcularLucro() {
        return getPrecoVenda().subtract(getPrecoCusto());
    }
    
    @Override
    public boolean verificarDisponibilidade() {
        return getQuantidadeEstoque() > 0;
    }
} 