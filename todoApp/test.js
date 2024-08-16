const search = document.getElementById('search');
const s_btn = document.getElementById('search-btn');
const lists = document.getElementById('lists');

// 로컬 스토리지에서 todos 가져오기
let todos = JSON.parse(localStorage.getItem('todos')) || [];

// 로컬 스토리지에서 todos를 읽어와서 화면에 표시
function renderTodos() {
    lists.innerHTML = ''; // 기존 항목들 삭제
    todos.forEach((todo, index) => {
        createFun(todo, false, index + 1);
    });
}

// 초기 로드 시 todos 렌더링
renderTodos();

s_btn.addEventListener('click', () => {
    const search_value = search.value.trim();
    if (search_value) {
        createFun(search_value, true, todos.length + 1);
        search.value = ''; // 입력 필드 초기화
    }
});

function createFun(value, save, index) {
    const todoItem = document.createElement('div');
    todoItem.classList.add('todo-list-mokitem');
    todoItem.innerHTML = `
        <div class="mokitem-title">${index}. ${value}</div>
        <div class="x-btn">X</div>
    `;
    
    lists.appendChild(todoItem);

    // 저장할 때만 로컬 스토리지 업데이트
    if (save) {
        todos.push(value);
        localStorage.setItem('todos', JSON.stringify(todos));
    }

    // X 버튼 클릭 이벤트 추가
    todoItem.querySelector('.x-btn').addEventListener('click', () => {
        deleteFun(todoItem, value);
    });
}

function deleteFun(item, value) {
    item.remove();

    // todos 배열에서 해당 항목 제거
    todos = todos.filter(todo => todo !== value);

    // 항목 인덱스를 업데이트
    updateTodos();

    // 로컬 스토리지 업데이트
    localStorage.setItem('todos', JSON.stringify(todos));
}

function updateTodos() {
    // lists의 모든 항목을 가져옴
    const items = Array.from(document.querySelectorAll('.todo-list-mokitem'));

    // 각 항목의 인덱스를 업데이트
    items.forEach((item, index) => {
        const title = item.querySelector('.mokitem-title');
        title.textContent = `${index + 1}. ${todos[index] || ''}`;
    });
}
