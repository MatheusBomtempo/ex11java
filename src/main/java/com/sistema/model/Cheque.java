package com.sistema.model;

import jakarta.persistence.Entity;
import lombok.Data;
import lombok.EqualsAndHashCode;
import java.time.LocalDate;

@Data
@Entity
@EqualsAndHashCode(callSuper = true)
public class Cheque extends FormaPagamento {
    
    private String numeroCheque;
    private String banco;
    private String agencia;
    private String conta;
    private LocalDate dataCompensacao;
    
    @Override
    public boolean processarPagamento() {
        // Implementação da lógica de processamento de pagamento com cheque
        return true;
    }
    
    @Override
    public String emitirComprovante() {
        return String.format("Comprovante de pagamento com cheque - Banco: %s, Agência: %s, Conta: %s", 
            banco, agencia, conta);
    }
} 