const addBtn = document.querySelector('.fa-plus'); // 추가 버튼, querySelector 첫번째 검색된 요소 하나
const input = document.querySelector('.footer_input'); // input 요소, class = .footer_input 연결
const items = document.querySelector('.items'); // ul 요소
const category = document.querySelector('#cg'); // select 요소

function getCurrentDate() {
  const now = new Date();
  const month = now.getMonth() + 1;
  const date = now.getDate();
  return `${month}월 ${date}일`;
}

function createItem(text) {
  // li 요소 생성함수
  console.log(text);
  const itemRow = document.createElement('li'); // li 요소 만들기, class = item인 것
  const currentDate = getCurrentDate();

  itemRow.className = 'item';
  itemRow.innerHTML = `<span>${text} <p class="date">${currentDate}</p></span>
          <i class="fa-solid fa-check"></i>
          <i class="fa-solid fa-trash-can"></i>`;

  // 추가된 기능 1 - 카테고리 별 색 지정
  const selectedCategory = category.options[category.selectedIndex].id;
  const span = itemRow.querySelector('span');

  if (selectedCategory == 'pm') {
    span.style.color = 'plum';
  } else if (selectedCategory == 'hw') {
    span.style.color = 'tomato';
  } else if (selectedCategory == 'ex') {
    span.style.color = 'lightblue';
  } else {
    span.style.color = 'black';
  }

  // 체크 버튼 클릭 시 클래스 추가 이벤트
  itemRow.querySelector('.fa-check').addEventListener('click', () => {
    itemRow.classList.toggle('item_done'); // classList여서 . 붙이지 않음
  }); // click, 콜백함수

  // 삭제 버튼 클릭시 itemRow 제거 이벤트
  itemRow.querySelector('.fa-trash-can').addEventListener('click', () => {
    itemRow.remove(); //
  });

  //   itemRow.scrollIntoView({ block: 'center' });
  //  스크롤 포커스 현재에 맞추기
  setTimeout(() => itemRow.scrollIntoView({ block: 'center' }), 0); // 콜백함수, 몇 초 있다가 작동할 지

  return itemRow;
}

// 추가 함수
function onAdd() {
  console.log('함수가 실행됐다');
  const text = input.value.trim(); // .trim() : 양쪽 공백 제거
  console.log(text);
  if (!text) {
    input.value = ' '; // 커서 원 위치
    input.focus();
    return;
  }

  // li 생성하는 함수 - createItem(text) <- callback 함수
  // ul에 생성값을 추가

  items.appendChild(createItem(text));
  input.value = ' ';
  input.focus();
}

// 이벤트 등록
addBtn.addEventListener('click', onAdd); // callback 영역에 onADD 연결
// input.addEventListener('keypress', (e) => {
//   console.log(e);
//   if (e.key === 'Enter') {
//     onAdd();
//   }
// });

input.addEventListener('keyup', (e) => e.key === 'Enter' && onAdd());
// 같은 기능을 하는 함수
