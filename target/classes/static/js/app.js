// Funções de Utilidade
function showSection(sectionId) {
    document.querySelectorAll('.section').forEach(section => {
        section.style.display = 'none';
    });
    document.getElementById(sectionId).style.display = 'block';
}

function showModal(modalId) {
    const modal = new bootstrap.Modal(document.getElementById(modalId));
    if (modalId === 'produtoModal') {
        carregarCategoriasSelect();
    }
    modal.show();
}

function hideModal(modalId) {
    const modal = bootstrap.Modal.getInstance(document.getElementById(modalId));
    modal.hide();
}

function formatarData(data) {
    return new Date(data).toLocaleDateString('pt-BR');
}

function formatarMoeda(valor) {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    }).format(valor);
}

// Funções para Categorias
async function carregarCategorias() {
    const categorias = await listarCategorias();
    const tbody = document.getElementById('categoriasTableBody');
    tbody.innerHTML = '';

    categorias.forEach(categoria => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${categoria.codigo}</td>
            <td>${categoria.nome}</td>
            <td>${categoria.descricao}</td>
            <td>
                <button class="btn btn-sm btn-primary btn-action" onclick="editarCategoria(${categoria.codigo})">Editar</button>
                <button class="btn btn-sm btn-danger btn-action" onclick="excluirCategoria(${categoria.codigo})">Excluir</button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

async function salvarCategoria() {
    const nome = document.getElementById('categoriaNome').value;
    const descricao = document.getElementById('categoriaDescricao').value;

    const categoria = {
        nome,
        descricao
    };

    await criarCategoria(categoria);
    hideModal('categoriaModal');
    carregarCategorias();
}

async function editarCategoria(codigo) {
    const categorias = await listarCategorias();
    const categoria = categorias.find(c => c.codigo === codigo);

    document.getElementById('categoriaNome').value = categoria.nome;
    document.getElementById('categoriaDescricao').value = categoria.descricao;

    showModal('categoriaModal');
}

async function excluirCategoria(codigo) {
    if (confirm('Tem certeza que deseja excluir esta categoria?')) {
        try {
            await fetch(`${API_BASE_URL}/categorias/${codigo}`, {
                method: 'DELETE'
            });
            await carregarCategorias();
        } catch (error) {
            console.error('Erro ao excluir categoria:', error);
            showError(`Erro ao excluir categoria: ${error.message}`);
        }
    }
}

// Funções para Produtos
async function carregarProdutos() {
    const produtos = await listarProdutos();
    const tbody = document.getElementById('produtosTableBody');
    tbody.innerHTML = '';

    produtos.forEach(produto => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${produto.codigo}</td>
            <td>${produto.nome}</td>
            <td>${produto.descricao}</td>
            <td>${formatarMoeda(produto.precoCusto)}</td>
            <td>${formatarMoeda(produto.precoVenda)}</td>
            <td>${produto.quantidadeEstoque}</td>
            <td>${produto.categoria.nome}</td>
            <td>
                <button class="btn btn-sm btn-primary btn-action" onclick="editarProduto(${produto.codigo})">Editar</button>
                <button class="btn btn-sm btn-danger btn-action" onclick="excluirProduto(${produto.codigo})">Excluir</button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

async function carregarCategoriasSelect() {
    const categorias = await listarCategorias();
    const select = document.getElementById('produtoCategoria');
    select.innerHTML = '';

    categorias.forEach(categoria => {
        const option = document.createElement('option');
        option.value = categoria.codigo;
        option.textContent = categoria.nome;
        select.appendChild(option);
    });
}

let produtoEditando = null;

async function editarProduto(codigo) {
    try {
        const response = await fetch(`${API_BASE_URL}/produtos/${codigo}`);
        if (!response.ok) {
            throw new Error('Erro ao buscar produto');
        }
        const produto = await response.json();
        produtoEditando = produto;

        document.getElementById('produtoTipo').value = produto.tipo || 'ALIMENTICIO';
        document.getElementById('produtoNome').value = produto.nome;
        document.getElementById('produtoDescricao').value = produto.descricao;
        document.getElementById('produtoPrecoCusto').value = produto.precoCusto;
        document.getElementById('produtoPrecoVenda').value = produto.precoVenda;
        document.getElementById('produtoQuantidadeEstoque').value = produto.quantidadeEstoque;
        document.getElementById('produtoCategoria').value = produto.categoria.codigo;

        showModal('produtoModal');
    } catch (error) {
        console.error('Erro ao carregar produto:', error);
        showError(`Erro ao carregar produto: ${error.message}`);
    }
}

async function salvarProduto() {
    const tipo = document.getElementById('produtoTipo').value;
    const nome = document.getElementById('produtoNome').value;
    const descricao = document.getElementById('produtoDescricao').value;
    const precoCusto = parseFloat(document.getElementById('produtoPrecoCusto').value) || 0;
    const precoVenda = parseFloat(document.getElementById('produtoPrecoVenda').value) || 0;
    const quantidadeEstoque = parseInt(document.getElementById('produtoQuantidadeEstoque').value) || 0;
    const categoriaCodigo = parseInt(document.getElementById('produtoCategoria').value);

    if (!categoriaCodigo) {
        showError('Por favor, selecione uma categoria');
        return;
    }

    const produto = {
        tipo,
        nome,
        descricao,
        precoCusto,
        precoVenda,
        quantidadeEstoque,
        categoriaCodigo
    };

    try {
        if (produtoEditando) {
            await atualizarProduto(produtoEditando.codigo, produto);
            produtoEditando = null;
        } else {
            await criarProduto(produto);
        }
        hideModal('produtoModal');
        await carregarProdutos();
    } catch (error) {
        console.error('Erro ao salvar produto:', error);
        showError(`Erro ao salvar produto: ${error.message}`);
    }
}

async function excluirProduto(codigo) {
    if (confirm('Tem certeza que deseja excluir este produto?')) {
        try {
            await fetch(`${API_BASE_URL}/produtos/${codigo}`, {
                method: 'DELETE'
            });
            await carregarProdutos();
        } catch (error) {
            console.error('Erro ao excluir produto:', error);
            showError(`Erro ao excluir produto: ${error.message}`);
        }
    }
}

// Funções para Clientes
async function carregarClientes() {
    const clientes = await listarClientes();
    const tbody = document.getElementById('clientesTableBody');
    tbody.innerHTML = '';

    clientes.forEach(cliente => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${cliente.id}</td>
            <td>${cliente.nome}</td>
            <td>${cliente.cpf}</td>
            <td>${cliente.email}</td>
            <td>${formatarData(cliente.dataNascimento)}</td>
            <td>
                <button class="btn btn-sm btn-primary btn-action" onclick="editarCliente(${cliente.id})">Editar</button>
                <button class="btn btn-sm btn-danger btn-action" onclick="excluirCliente(${cliente.id})">Excluir</button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

async function editarCliente(id) {
    try {
        const response = await fetch(`${API_BASE_URL}/clientes/${id}`);
        if (!response.ok) {
            throw new Error('Erro ao buscar cliente');
        }
        const cliente = await response.json();

        document.getElementById('clienteNome').value = cliente.nome;
        document.getElementById('clienteCpf').value = cliente.cpf;
        document.getElementById('clienteEmail').value = cliente.email;
        document.getElementById('clienteDataNascimento').value = cliente.dataNascimento;

        // Armazenar o ID do cliente sendo editado
        document.getElementById('clienteModal').dataset.editandoId = id;

        showModal('clienteModal');
    } catch (error) {
        console.error('Erro ao carregar cliente:', error);
        showError(`Erro ao carregar cliente: ${error.message}`);
    }
}

async function salvarCliente() {
    const nome = document.getElementById('clienteNome').value.trim();
    const cpf = document.getElementById('clienteCpf').value.trim();
    const email = document.getElementById('clienteEmail').value.trim();
    const dataNascimento = document.getElementById('clienteDataNascimento').value;
    const editandoId = document.getElementById('clienteModal').dataset.editandoId;

    if (!nome) {
        showError('O nome do cliente é obrigatório');
        return;
    }

    if (!cpf) {
        showError('O CPF do cliente é obrigatório');
        return;
    }

    if (!email) {
        showError('O email do cliente é obrigatório');
        return;
    }

    if (!dataNascimento) {
        showError('A data de nascimento é obrigatória');
        return;
    }

    const cliente = {
        nome,
        cpf,
        email,
        dataNascimento
    };

    try {
        if (editandoId) {
            await atualizarCliente(editandoId, cliente);
            document.getElementById('clienteModal').dataset.editandoId = '';
        } else {
            await criarCliente(cliente);
        }
        hideModal('clienteModal');
        await carregarClientes();
    } catch (error) {
        console.error('Erro ao salvar cliente:', error);
    }
}

async function excluirCliente(id) {
    if (confirm('Tem certeza que deseja excluir este cliente?')) {
        try {
            await fetch(`${API_BASE_URL}/clientes/${id}`, {
                method: 'DELETE'
            });
            await carregarClientes();
        } catch (error) {
            console.error('Erro ao excluir cliente:', error);
            showError(`Erro ao excluir cliente: ${error.message}`);
        }
    }
}

// Funções para Vendas
async function carregarVendas() {
    const vendas = await listarVendas();
    const tbody = document.getElementById('vendasTableBody');
    tbody.innerHTML = '';

    vendas.forEach(venda => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${venda.id}</td>
            <td>${venda.cliente.nome}</td>
            <td>${formatarMoeda(venda.valorTotal)}</td>
            <td>${formatarData(venda.data)}</td>
            <td>${venda.formaPagamento.tipo}</td>
            <td>
                <button class="btn btn-sm btn-primary btn-action" onclick="editarVenda(${venda.id})">Editar</button>
                <button class="btn btn-sm btn-danger btn-action" onclick="excluirVenda(${venda.id})">Excluir</button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

async function carregarClientesSelect() {
    const clientes = await listarClientes();
    const select = document.getElementById('vendaCliente');
    select.innerHTML = '';

    clientes.forEach(cliente => {
        const option = document.createElement('option');
        option.value = cliente.id;
        option.textContent = cliente.nome;
        select.appendChild(option);
    });
}

async function carregarProdutosSelect() {
    const produtos = await listarProdutos();
    const select = document.getElementById('vendaProdutos');
    select.innerHTML = '';

    produtos.forEach(produto => {
        const option = document.createElement('option');
        option.value = produto.codigo;
        option.textContent = `${produto.nome} - ${formatarMoeda(produto.precoVenda)}`;
        select.appendChild(option);
    });
}

async function salvarVenda() {
    const clienteId = parseInt(document.getElementById('vendaCliente').value);
    const produtosIds = Array.from(document.getElementById('vendaProdutos').selectedOptions).map(option => parseInt(option.value));
    const formaPagamentoTipo = document.getElementById('vendaFormaPagamento').value;

    if (!clienteId) {
        showError('Selecione um cliente');
        return;
    }

    if (produtosIds.length === 0) {
        showError('Selecione pelo menos um produto');
        return;
    }

    if (!formaPagamentoTipo) {
        showError('Selecione uma forma de pagamento');
        return;
    }

    const venda = {
        cliente: {
            id: clienteId
        },
        itens: produtosIds.map(id => ({
            produto: {
                codigo: id
            },
            quantidade: 1
        })),
        formaPagamento: {
            tipo: formaPagamentoTipo
        }
    };

    try {
        await criarVenda(venda);
        hideModal('vendaModal');
        await carregarVendas();
    } catch (error) {
        console.error('Erro ao salvar venda:', error);
    }
}

async function editarVenda(id) {
    try {
        const response = await fetch(`${API_BASE_URL}/vendas/${id}`);
        if (!response.ok) {
            throw new Error('Erro ao buscar venda');
        }
        const venda = await response.json();

        document.getElementById('vendaCliente').value = venda.cliente.id;
        document.getElementById('vendaFormaPagamento').value = venda.formaPagamento.tipo;

        const produtosSelect = document.getElementById('vendaProdutos');
        Array.from(produtosSelect.options).forEach(option => {
            option.selected = venda.itens.some(item => item.produto.codigo === parseInt(option.value));
        });

        // Armazenar o ID da venda sendo editada
        document.getElementById('vendaModal').dataset.editandoId = id;

        showModal('vendaModal');
    } catch (error) {
        console.error('Erro ao carregar venda:', error);
        showError(`Erro ao carregar venda: ${error.message}`);
    }
}

async function excluirVenda(id) {
    if (confirm('Tem certeza que deseja excluir esta venda?')) {
        try {
            await fetch(`${API_BASE_URL}/vendas/${id}`, {
                method: 'DELETE'
            });
            await carregarVendas();
        } catch (error) {
            console.error('Erro ao excluir venda:', error);
            showError(`Erro ao excluir venda: ${error.message}`);
        }
    }
}

// Inicialização
document.addEventListener('DOMContentLoaded', async () => {
    // Carregar dados iniciais
    await carregarCategorias();
    await carregarProdutos();
    await carregarClientes();
    await carregarVendas();

    // Carregar dados para os selects
    await carregarCategoriasSelect();
    await carregarClientesSelect();
    await carregarProdutosSelect();
}); 