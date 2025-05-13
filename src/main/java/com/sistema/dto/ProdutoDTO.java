package com.sistema.dto;

import lombok.Data;
import java.math.BigDecimal;

@Data
public class ProdutoDTO {
    private String tipo;
    private String nome;
    private String descricao;
    private BigDecimal precoCusto;
    private BigDecimal precoVenda;
    private Integer quantidadeEstoque;
    private Long categoriaCodigo;
} 