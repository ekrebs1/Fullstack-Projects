

makeGrid();
function makeGrid() {
     for (let i = 0; i < 64; i++) {
    let cell = $('<div class="cell"></div>');
    $('.grid').append(cell);
        }
}

makePalette();
function makePalette() {
    let PALETTE = [
      '#E0082d',
      '#DF7800',
      '#ffff00',
      '#679327',
      '#55BED7',
      '#50105A',
      '#C44483',
      'white',
      'black',
];

$('.palette button').first().addClass('active');   
      
    for (let i = 0; i < PALETTE.length; i++) {
        let button = $('<button>');
        button.css('backgroundColor', PALETTE[i]);
        $('.palette').append(button);
} }
 
$('.palette button').click(onPaletteClick)

    function onPaletteClick() {
    $('.palette .active').removeClass('active');
    $(this).addClass('active');
}
    
$('.grid .cell').click(onGridClick);

function onGridClick() {
    let activeColor = $('.palette .active').css('background-color');
    let cellColor = $(this).css('background');
        
if (cellColor === activeColor) {
        $(this).css('background', '');
        } 
else {
    $(this).css('background', activeColor);
        }
} 
      
$('.controls .clear').click(onClearClick);
      
function onClearClick() {
    $('.grid .cell').css('background', '');
}
      
$('.fill-all').click(onFillAllClick)   

    function onFillAllClick() {
    let activeColor = $('.palette .active').css('background');
     $('.cell').css('background', activeColor);
}

$('.fill-empty').click(onFillEmptyClick);
    function onFillEmptyClick() {
    let activeColor = $('.palette .active').css('backgroundColor');
    let cells = $('.cell');
  
    for (let i = 0; i < cells.length; i++) {
      let cell = cells[i];
  
      console.log($(cell).css('background-color'))
  
      if ($(cell).css('backgroundColor') == 'rgba(0, 0, 0, 0)') {
        $(cell).css('backgroundColor', activeColor);
      }
    }
  }
  



  

      
  