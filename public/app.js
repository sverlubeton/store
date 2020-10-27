const toCurrency = price => {
  return new Intl.NumberFormat('en-US', {
    currency: 'usd',
    style: 'currency'
  }).format(price)
}

const toDate = date => {
  return new Intl.DateTimeFormat('en-US', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  }).format(new Date(date))
}

document.querySelectorAll('.price').forEach(node => {
  node.textContent = toCurrency(node.textContent)
})

document.querySelectorAll('.date').forEach(node => {
  node.textContent = toDate(node.textContent)
})

const $card = document.querySelector('#card')
if ($card) {
  $card.addEventListener('click', event => {
    if (event.target.classList.contains('js-remove')) {
      const id = event.target.dataset.id
   
      const csrf = event.target.dataset.csrf
      
      fetch('/card/remove/' + id, {
        method: 'delete',
        headers: {
          'X-XSRF-TOKEN': csrf
        },
      }).then(res => res.json())
        .then(card => {
          if (card.courses.length) {
            const html = card.courses.map(c => {
              return `
              <tr>
                <td>${c.title}</td>
                <td>${c.count}</td>
                <td>
                  <button class="btn btm-small js-remove" data-csrf="${csrf}" data-id="${c.id}">Remove</button>
                </td>
              </tr>
              `
            }).join('')
            $card.querySelector('tbody').innerHTML = html
            $card.querySelector('.price').textContent = toCurrency(card.price)
          } else {
            $card.innerHTML = '<p>Cart is empty</p>'
          }
        })
    }
    
  })
} 

const $usersTable = document.querySelector('.users-table')
console.log($usersTable);
if ($usersTable) {
  
  $usersTable.addEventListener('click', event => {
    if (event.target.classList.contains('rem')) {
      const id = event.target.dataset.id
      const csrf = event.target.dataset.csrf
      fetch('/users/remove/' + id, {
        method: 'delete',
        headers: {
          'X-XSRF-TOKEN': csrf
        },
      }).then(res => res.json())
        .then(({users}) => {
          
            const html = users.map(u => {
              return `
              <tr>
                <td>${u.name}</td>
                <td>${u.email}</td>
                <td>
                  <button class="btn btm-small rem" data-csrf="${csrf}" data-id="${u._id}">Remove</button>
                </td>
              </tr>
              `
            }).join('')
            $usersTable.querySelector('tbody').innerHTML = html
          
        })
    }
    
  })
} 





M.Tabs.init(document.querySelectorAll('.tabs'))

document.addEventListener('DOMContentLoaded', function() {
  var elems = document.querySelectorAll('.carousel');
  var instances = M.Carousel.init(elems, {fullWidth: false, duration:300, dist:-100,shift: 50, padding: 100,  indicators: true });
  setInterval(()=>{
    M.Carousel.getInstance(elems[0]).next()
    }, 3000)
});

const pagination = document.querySelector('.pagination')
pagination.addEventListener('click', function(event) {
  if(event.target.classList.contains('waves-effect')){
    const index = event.target.dataset.index
    fetch('/laptops?skip=' + index, {
      method: 'get',
      
    })
  }
})