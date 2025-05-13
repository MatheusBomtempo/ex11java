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
        const contentType = response.headers.get('content-type');
        let errorMessage = 'Erro ao processar a requisição';
        
        if (contentType && contentType.includes('application/json')) {
            const errorData = await response.json();
            errorMessage = errorData.message || errorData.erro || errorMessage;
        } else {
            const text = await response.text();
            if (text) {
                errorMessage = text;
            }
        }
        
        throw new Error(errorMessage);
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
    const response = await fetch(`${API_BASE_URL}/produtos`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(produto)
    });

    if (!response.ok) {
        const error = await response.text();
        throw new Error(error);
    }

    return response.json();
}

async function atualizarProduto(id, produto) {
    const response = await fetch(`${API_BASE_URL}/produtos/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(produto)
    });

    if (!response.ok) {
        const error = await response.text();
        throw new Error(error);
    }

    return response.json();
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
    const response = await fetch(`${API_BASE_URL}/clientes`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(cliente)
    });

    if (!response.ok) {
        const contentType = response.headers.get('content-type');
        let errorMessage = 'Erro ao criar cliente';
        
        if (contentType && contentType.includes('application/json')) {
            const errorData = await response.json();
            errorMessage = errorData.message || errorData.erro || errorMessage;
        } else {
            const text = await response.text();
            if (text) {
                errorMessage = text;
            }
        }
        
        showError(errorMessage);
        throw new Error(errorMessage);
    }

    return await response.json();
}

async function atualizarCliente(id, cliente) {
    const response = await fetch(`${API_BASE_URL}/clientes/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(cliente)
    });

    if (!response.ok) {
        const contentType = response.headers.get('content-type');
        let errorMessage = 'Erro ao atualizar cliente';
        
        if (contentType && contentType.includes('application/json')) {
            const errorData = await response.json();
            errorMessage = errorData.message || errorData.erro || errorMessage;
        } else {
            const text = await response.text();
            if (text) {
                errorMessage = text;
            }
        }
        
        showError(errorMessage);
        throw new Error(errorMessage);
    }

    return await response.json();
}

async function excluirCliente(id) {
    const response = await fetch(`${API_BASE_URL}/clientes/${id}`, {
        method: 'DELETE'
    });

    if (!response.ok) {
        const contentType = response.headers.get('content-type');
        let errorMessage = 'Erro ao excluir cliente';
        
        if (contentType && contentType.includes('application/json')) {
            const errorData = await response.json();
            errorMessage = errorData.message || errorData.erro || errorMessage;
        } else {
            const text = await response.text();
            if (text) {
                errorMessage = text;
            }
        }
        
        showError(errorMessage);
        throw new Error(errorMessage);
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
    const response = await fetch(`${API_BASE_URL}/vendas`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(venda)
    });

    if (!response.ok) {
        const contentType = response.headers.get('content-type');
        let errorMessage = 'Erro ao criar venda';
        
        try {
            if (contentType && contentType.includes('application/json')) {
                const errorData = await response.json();
                errorMessage = errorData.message || errorData.erro || errorMessage;
            } else {
                const text = await response.text();
                if (text) {
                    errorMessage = text;
                }
            }
        } catch (e) {
            console.error('Erro ao processar resposta:', e);
        }
        
        showError(errorMessage);
        throw new Error(errorMessage);
    }

    return await response.json();
}

async function atualizarVenda(id, venda) {
    const response = await fetch(`${API_BASE_URL}/vendas/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(venda)
    });

    if (!response.ok) {
        const contentType = response.headers.get('content-type');
        let errorMessage = 'Erro ao atualizar venda';
        
        if (contentType && contentType.includes('application/json')) {
            const errorData = await response.json();
            errorMessage = errorData.message || errorData.erro || errorMessage;
        } else {
            const text = await response.text();
            if (text) {
                errorMessage = text;
            }
        }
        
        showError(errorMessage);
        throw new Error(errorMessage);
    }

    return await response.json();
}

async function excluirVenda(id) {
    const response = await fetch(`${API_BASE_URL}/vendas/${id}`, {
        method: 'DELETE'
    });

    if (!response.ok) {
        const contentType = response.headers.get('content-type');
        let errorMessage = 'Erro ao excluir venda';
        
        if (contentType && contentType.includes('application/json')) {
            const errorData = await response.json();
            errorMessage = errorData.message || errorData.erro || errorMessage;
        } else {
            const text = await response.text();
            if (text) {
                errorMessage = text;
            }
        }
        
        showError(errorMessage);
        throw new Error(errorMessage);
    }
} 