package com.sistema.controller;

import com.sistema.model.Categoria;
import com.sistema.repository.CategoriaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/categorias")
public class CategoriaController {

    @Autowired
    private CategoriaRepository categoriaRepository;

    @GetMapping
    public List<Categoria> listarTodas() {
        return categoriaRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Categoria> buscarPorId(@PathVariable Long id) {
        return categoriaRepository.findById(id)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Categoria> criar(@Valid @RequestBody Categoria categoria) {
        if (categoriaRepository.existsByNome(categoria.getNome())) {
            return ResponseEntity.badRequest().build();
        }
        return ResponseEntity.ok(categoriaRepository.save(categoria));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Categoria> atualizar(@PathVariable Long id, @Valid @RequestBody Categoria categoria) {
        return categoriaRepository.findById(id)
            .map(existente -> {
                categoria.setCodigo(id);
                return ResponseEntity.ok(categoriaRepository.save(categoria));
            })
            .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Long id) {
        return categoriaRepository.findById(id)
            .map(categoria -> {
                categoriaRepository.delete(categoria);
                return ResponseEntity.ok().<Void>build();
            })
            .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/nome/{nome}")
    public ResponseEntity<Categoria> buscarPorNome(@PathVariable String nome) {
        return categoriaRepository.findByNome(nome)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }
} 