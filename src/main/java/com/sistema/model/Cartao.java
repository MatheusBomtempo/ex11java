package com.sistema.model;

import jakarta.persistence.Entity;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@Entity
@EqualsAndHashCode(callSuper = true)
public class Cartao extends FormaPagamento {
    
    private String numeroCartao;
    private String bandeira;
    private Integer parcelas;
    
    @Override
    public boolean processarPagamento() {
        // Implementação da lógica de processamento de pagamento com cartão
        return true;
    }
    
    @Override
    public String emitirComprovante() {
        return String.format("Comprovante de pagamento - Cartão %s - Parcelas: %d", 
            bandeira, parcelas);
    }
} 