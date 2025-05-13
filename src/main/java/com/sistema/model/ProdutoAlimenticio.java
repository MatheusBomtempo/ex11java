package com.sistema.model;

import jakarta.persistence.Entity;
import lombok.Data;
import lombok.EqualsAndHashCode;
import java.math.BigDecimal;
import java.time.LocalDate;

@Data
@Entity
@EqualsAndHashCode(callSuper = true)
public class ProdutoAlimenticio extends Produto {
    
    private LocalDate dataValidade;
    private String marca;
    private String lote;
    
    @Override
    public BigDecimal calcularLucro() {
        return getPrecoVenda().subtract(getPrecoCusto());
    }
    
    @Override
    public boolean verificarDisponibilidade() {
        return getQuantidadeEstoque() > 0 && !dataValidade.isBefore(LocalDate.now());
    }
} 