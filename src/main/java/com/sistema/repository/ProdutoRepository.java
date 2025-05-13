package com.sistema.repository;

import com.sistema.model.Produto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ProdutoRepository extends JpaRepository<Produto, Long> {
    List<Produto> findByNomeContainingIgnoreCase(String nome);
    List<Produto> findByCategoriaCodigo(Long codigo);
    List<Produto> findByQuantidadeEstoqueLessThan(Integer quantidade);
} 