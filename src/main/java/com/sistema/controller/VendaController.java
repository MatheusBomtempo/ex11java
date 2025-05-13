package com.sistema.controller;

import com.sistema.model.Venda;
import com.sistema.repository.VendaRepository;
import com.sistema.service.GerenciadorEstoque;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;
import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/vendas")
public class VendaController {

    @Autowired
    private VendaRepository vendaRepository;

    @Autowired
    private GerenciadorEstoque gerenciadorEstoque;

    @GetMapping
    public List<Venda> listarTodas() {
        return vendaRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Venda> buscarPorId(@PathVariable Long id) {
        return vendaRepository.findById(id)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Venda> criar(@Valid @RequestBody Venda venda) {
        if (venda.finalizarVenda()) {
            gerenciadorEstoque.registrarVenda(venda);
            return ResponseEntity.ok(vendaRepository.save(venda));
        }
        return ResponseEntity.badRequest().build();
    }

    @GetMapping("/cliente/{clienteId}")
    public List<Venda> buscarPorCliente(@PathVariable Long clienteId) {
        return vendaRepository.findByClienteId(clienteId);
    }

    @GetMapping("/periodo")
    public List<Venda> buscarPorPeriodo(
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime inicio,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime fim) {
        return vendaRepository.findByDataVendaBetween(inicio, fim);
    }

    @GetMapping("/forma-pagamento/{formaPagamentoId}")
    public List<Venda> buscarPorFormaPagamento(@PathVariable Long formaPagamentoId) {
        return vendaRepository.findByFormaPagamentoId(formaPagamentoId);
    }
} 