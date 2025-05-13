package com.sistema.model;

import jakarta.persistence.Entity;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@Entity
@EqualsAndHashCode(callSuper = true)
public class Dinheiro extends FormaPagamento {
    
    private boolean trocoDisponivel;
    
    @Override
    public boolean processarPagamento() {
        // Implementação da lógica de processamento de pagamento em dinheiro
        return true;
    }
    
    @Override
    public String emitirComprovante() {
        return String.format("Comprovante de pagamento em dinheiro - Valor: R$ %.2f", 
            getValorPago());
    }
} 