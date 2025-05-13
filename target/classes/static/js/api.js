const API_BASE_URL = '/api';

// Função para exibir erros
function showError(message) {
    const errorToast = document.getElementById('errorToast');
    const errorMessage = document.getElementById('errorMessage');
    errorMessage.textContent = message;
    const toast = new bootstrap.Toast(errorToast);
    toast.show();
}

// Função para tratar erros da API
async function handleApiError(response) {
    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Erro ao processar a requisição');
    }
    return response;
}

// Funções para Categorias
async function listarCategorias() {
    try {
        const response = await fetch(`${API_BASE_URL}/categorias`);
        await handleApiError(response);
        return await response.json();
    } catch (error) {
        showError(`Erro ao listar categorias: ${error.message}`);
        throw error;
    }
}

async function criarCategoria(categoria) {
    try {
        const response = await fetch(`${API_BASE_URL}/categorias`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(categoria)
        });
        await handleApiError(response);
        return await response.json();
    } catch (error) {
        showError(`Erro ao criar categoria: ${error.message}`);
        throw error;
    }
}

async function atualizarCategoria(codigo, categoria) {
    try {
        const response = await fetch(`${API_BASE_URL}/categorias/${codigo}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(categoria)
        });
        await handleApiError(response);
        return await response.json();
    } catch (error) {
        showError(`Erro ao atualizar categoria: ${error.message}`);
        throw error;
    }
}

async function excluirCategoria(codigo) {
    try {
        const response = await fetch(`${API_BASE_URL}/categorias/${codigo}`, {
            method: 'DELETE'
        });
        await handleApiError(response);
    } catch (error) {
        showError(`Erro ao excluir categoria: ${error.message}`);
        throw error;
    }
}

// Funções para Produtos
async function listarProdutos() {
    try {
        const response = await fetch(`${API_BASE_URL}/produtos`);
        await handleApiError(response);
        return await response.json();
    } catch (error) {
        showError(`Erro ao listar produtos: ${error.message}`);
        throw error;
    }
}

async function criarProduto(produto) {
    try {
        const response = await fetch(`${API_BASE_URL}/produtos`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(produto)
        });
        await handleApiError(response);
        return await response.json();
    } catch (error) {
        showError(`Erro ao criar produto: ${error.message}`);
        throw error;
    }
}

async function atualizarProduto(codigo, produto) {
    try {
        const response = await fetch(`${API_BASE_URL}/produtos/${codigo}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(produto)
        });
        await handleApiError(response);
        return await response.json();
    } catch (error) {
        showError(`Erro ao atualizar produto: ${error.message}`);
        throw error;
    }
}

async function excluirProduto(codigo) {
    try {
        const response = await fetch(`${API_BASE_URL}/produtos/${codigo}`, {
            method: 'DELETE'
        });
        await handleApiError(response);
    } catch (error) {
        showError(`Erro ao excluir produto: ${error.message}`);
        throw error;
    }
}

// Funções para Clientes
async function listarClientes() {
    try {
        const response = await fetch(`${API_BASE_URL}/clientes`);
        await handleApiError(response);
        return await response.json();
    } catch (error) {
        showError(`Erro ao listar clientes: ${error.message}`);
        throw error;
    }
}

async function criarCliente(cliente) {
    try {
        const response = await fetch(`${API_BASE_URL}/clientes`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(cliente)
        });
        await handleApiError(response);
        return await response.json();
    } catch (error) {
        showError(`Erro ao criar cliente: ${error.message}`);
        throw error;
    }
}

async function atualizarCliente(id, cliente) {
    try {
        const response = await fetch(`${API_BASE_URL}/clientes/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(cliente)
        });
        await handleApiError(response);
        return await response.json();
    } catch (error) {
        showError(`Erro ao atualizar cliente: ${error.message}`);
        throw error;
    }
}

async function excluirCliente(id) {
    try {
        const response = await fetch(`${API_BASE_URL}/clientes/${id}`, {
            method: 'DELETE'
        });
        await handleApiError(response);
    } catch (error) {
        showError(`Erro ao excluir cliente: ${error.message}`);
        throw error;
    }
}

// Funções para Vendas
async function listarVendas() {
    try {
        const response = await fetch(`${API_BASE_URL}/vendas`);
        await handleApiError(response);
        return await response.json();
    } catch (error) {
        showError(`Erro ao listar vendas: ${error.message}`);
        throw error;
    }
}

async function criarVenda(venda) {
    try {
        const response = await fetch(`${API_BASE_URL}/vendas`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(venda)
        });
        await handleApiError(response);
        return await response.json();
    } catch (error) {
        showError(`Erro ao criar venda: ${error.message}`);
        throw error;
    }
}

async function atualizarVenda(id, venda) {
    try {
        const response = await fetch(`${API_BASE_URL}/vendas/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(venda)
        });
        await handleApiError(response);
        return await response.json();
    } catch (error) {
        showError(`Erro ao atualizar venda: ${error.message}`);
        throw error;
    }
}

async function excluirVenda(id) {
    try {
        const response = await fetch(`${API_BASE_URL}/vendas/${id}`, {
            method: 'DELETE'
        });
        await handleApiError(response);
    } catch (error) {
        showError(`Erro ao excluir venda: ${error.message}`);
        throw error;
    }
} 