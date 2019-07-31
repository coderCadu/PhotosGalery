import $ from 'jquery'

import { onLoadHtmlSuccess } from '../core/includes'

const duration = 300

function filterByCity(city) {
  $('[city]').each(function(index, element) {
    const isTarget = $(this).attr('city') === city || city === null
    if (isTarget) {
      $(this).parent().removeClass('d-none')
      $(this).fadeIn(duration)
    } else {
      $(this).fadeOut(duration, () => {
        $(this).parent().addClass('d-none')
      })
    }
  })
}

$.fn.cityButtons = function() {
  const cities = new Set
  $('[city]').each((index, element) => {
    cities.add($(element).attr('city'))
  })

  const btns = Array.from(cities).map(city => {
    const btn = $('<button>').addClass(['btn', 'btn-info']).html(city)
    btn.click(e => filterByCity(city))
    return btn
  })

  const btnAll = $('<button>').addClass(['btn', 'btn-info', 'active']).html('All')
  btnAll.click(e => filterByCity(null))
  btns.push(btnAll)

  const btnGroup = $('<div>').addClass(['btn-group'])
  btnGroup.append(btns)

  $(this).html(btnGroup)
  return this
}

onLoadHtmlSuccess(function() {
  $('[city-buttons]').cityButtons()
})
