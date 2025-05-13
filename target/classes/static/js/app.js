// Funções de Utilidade
function showSection(sectionId) {
    document.querySelectorAll('.section').forEach(section => {
        section.style.display = 'none';
    });
    document.getElementById(sectionId).style.display = 'block';
}

function showModal(modalId) {
    const modal = new bootstrap.Modal(document.getElementById(modalId));
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

async function salvarProduto() {
    const nome = document.getElementById('produtoNome').value;
    const descricao = document.getElementById('produtoDescricao').value;
    const precoCusto = parseFloat(document.getElementById('produtoPrecoCusto').value);
    const precoVenda = parseFloat(document.getElementById('produtoPrecoVenda').value);
    const quantidadeEstoque = parseInt(document.getElementById('produtoQuantidadeEstoque').value);
    const categoriaCodigo = parseInt(document.getElementById('produtoCategoria').value);

    const produto = {
        nome,
        descricao,
        precoCusto,
        precoVenda,
        quantidadeEstoque,
        categoria: {
            codigo: categoriaCodigo
        }
    };

    await criarProduto(produto);
    hideModal('produtoModal');
    carregarProdutos();
}

async function editarProduto(codigo) {
    const produtos = await listarProdutos();
    const produto = produtos.find(p => p.codigo === codigo);

    document.getElementById('produtoNome').value = produto.nome;
    document.getElementById('produtoDescricao').value = produto.descricao;
    document.getElementById('produtoPrecoCusto').value = produto.precoCusto;
    document.getElementById('produtoPrecoVenda').value = produto.precoVenda;
    document.getElementById('produtoQuantidadeEstoque').value = produto.quantidadeEstoque;
    document.getElementById('produtoCategoria').value = produto.categoria.codigo;

    showModal('produtoModal');
}

async function excluirProduto(codigo) {
    if (confirm('Tem certeza que deseja excluir este produto?')) {
        await excluirProduto(codigo);
        carregarProdutos();
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

async function salvarCliente() {
    const nome = document.getElementById('clienteNome').value;
    const cpf = document.getElementById('clienteCpf').value;
    const email = document.getElementById('clienteEmail').value;
    const dataNascimento = document.getElementById('clienteDataNascimento').value;

    const cliente = {
        nome,
        cpf,
        email,
        dataNascimento
    };

    await criarCliente(cliente);
    hideModal('clienteModal');
    carregarClientes();
}

async function editarCliente(id) {
    const clientes = await listarClientes();
    const cliente = clientes.find(c => c.id === id);

    document.getElementById('clienteNome').value = cliente.nome;
    document.getElementById('clienteCpf').value = cliente.cpf;
    document.getElementById('clienteEmail').value = cliente.email;
    document.getElementById('clienteDataNascimento').value = cliente.dataNascimento;

    showModal('clienteModal');
}

async function excluirCliente(id) {
    if (confirm('Tem certeza que deseja excluir este cliente?')) {
        await excluirCliente(id);
        carregarClientes();
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
            <td>${venda.formaPagamento}</td>
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
    const formaPagamento = document.getElementById('vendaFormaPagamento').value;

    const venda = {
        cliente: {
            id: clienteId
        },
        produtos: produtosIds.map(id => ({ codigo: id })),
        formaPagamento
    };

    await criarVenda(venda);
    hideModal('vendaModal');
    carregarVendas();
}

async function editarVenda(id) {
    const vendas = await listarVendas();
    const venda = vendas.find(v => v.id === id);

    document.getElementById('vendaCliente').value = venda.cliente.id;
    document.getElementById('vendaFormaPagamento').value = venda.formaPagamento;

    const produtosSelect = document.getElementById('vendaProdutos');
    Array.from(produtosSelect.options).forEach(option => {
        option.selected = venda.produtos.some(p => p.codigo === parseInt(option.value));
    });

    showModal('vendaModal');
}

async function excluirVenda(id) {
    if (confirm('Tem certeza que deseja excluir esta venda?')) {
        await excluirVenda(id);
        carregarVendas();
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