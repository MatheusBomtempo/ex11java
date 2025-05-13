package com.sistema.controller;

import com.sistema.model.Cliente;
import com.sistema.repository.ClienteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;
import java.util.List;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@RestController
@RequestMapping("/api/clientes")
public class ClienteController {
    private static final Logger logger = LoggerFactory.getLogger(ClienteController.class);

    @Autowired
    private ClienteRepository clienteRepository;

    @GetMapping
    public List<Cliente> listarTodos() {
        return clienteRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Cliente> buscarPorId(@PathVariable Long id) {
        return clienteRepository.findById(id)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Cliente> criar(@Valid @RequestBody Cliente cliente) {
        try {
            logger.info("Criando cliente: {}", cliente);

            if (cliente.getNome() == null || cliente.getNome().trim().isEmpty()) {
                logger.error("Nome do cliente não pode ser vazio");
                return ResponseEntity.badRequest().build();
            }

            if (cliente.getCpf() == null || cliente.getCpf().trim().isEmpty()) {
                logger.error("CPF do cliente não pode ser vazio");
                return ResponseEntity.badRequest().build();
            }

            if (cliente.getEmail() == null || cliente.getEmail().trim().isEmpty()) {
                logger.error("Email do cliente não pode ser vazio");
                return ResponseEntity.badRequest().build();
            }

            if (clienteRepository.existsByCpf(cliente.getCpf())) {
                logger.error("CPF já cadastrado: {}", cliente.getCpf());
                return ResponseEntity.badRequest().build();
            }

            if (clienteRepository.existsByEmail(cliente.getEmail())) {
                logger.error("Email já cadastrado: {}", cliente.getEmail());
                return ResponseEntity.badRequest().build();
            }

            Cliente clienteSalvo = clienteRepository.save(cliente);
            logger.info("Cliente criado com sucesso: {}", clienteSalvo);
            return ResponseEntity.ok(clienteSalvo);
        } catch (Exception e) {
            logger.error("Erro ao criar cliente", e);
            return ResponseEntity.internalServerError().build();
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<Cliente> atualizar(@PathVariable Long id, @Valid @RequestBody Cliente cliente) {
        return clienteRepository.findById(id)
            .map(existente -> {
                cliente.setId(id);
                return ResponseEntity.ok(clienteRepository.save(cliente));
            })
            .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Long id) {
        return clienteRepository.findById(id)
            .map(cliente -> {
                clienteRepository.delete(cliente);
                return ResponseEntity.ok().<Void>build();
            })
            .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/cpf/{cpf}")
    public ResponseEntity<Cliente> buscarPorCpf(@PathVariable String cpf) {
        return clienteRepository.findByCpf(cpf)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/email/{email}")
    public ResponseEntity<Cliente> buscarPorEmail(@PathVariable String email) {
        return clienteRepository.findByEmail(email)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }
} 