var game_el = {};
game_el.container = document.querySelector('.container');
game_el.size = 10;
game_el.lab_construction_size = game_el.container.clientWidth / game_el.size + 'px';

game_el.lab_path = [];

game_el.cell = {};
game_el.cell.borders = [1, 1, 1, 1];
game_el.cell.borders_name = ['top', 'right', 'bottom', 'left'];
game_el.cell.position = {};
game_el.cell.value = false;

game_el.lab_construction = function (cell) {
    cell.value = true;
    var html_element = game_el.container.querySelectorAll('.row')[cell.position.x].querySelectorAll('.case')[cell.position.y];
    html_element.style.backgroundColor = "yellow";
    var cells = [];
    if (game_el.tab[cell.position.x - 1] != undefined && !game_el.tab[cell.position.x - 1][cell.position.y].value) cells.push(game_el.tab[cell.position.x - 1][cell.position.y]);
    if (game_el.tab[cell.position.x][cell.position.y + 1] != undefined && !game_el.tab[cell.position.x][cell.position.y + 1].value) cells.push(game_el.tab[cell.position.x][cell.position.y + 1]);
    if (game_el.tab[cell.position.x + 1] != undefined && !game_el.tab[cell.position.x + 1][cell.position.y].value) cells.push(game_el.tab[cell.position.x + 1][cell.position.y]);
    if (game_el.tab[cell.position.x][cell.position.y - 1] != undefined && !game_el.tab[cell.position.x][cell.position.y - 1].value) cells.push(game_el.tab[cell.position.x][cell.position.y - 1]);
    if (cells.length != 0) {
        var next_cell = cells[Math.floor(Math.random() * cells.length)];
        var next_html_element = game_el.container.querySelectorAll('.row')[next_cell.position.x].querySelectorAll('.case')[next_cell.position.y];
        game_el.lab_path.push(next_cell);
        if (cell.position.x < next_cell.position.x) {
            game_el.border_construction(cell, next_cell, html_element, next_html_element, 2, 0)
        } else if (cell.position.x > next_cell.position.x) {
            game_el.border_construction(cell, next_cell, html_element, next_html_element, 0, 2);
        } else if (cell.position.y < next_cell.position.y) {
            game_el.border_construction(cell, next_cell, html_element, next_html_element, 1, 3)
        } else if (cell.position.y > next_cell.position.y) {
            game_el.border_construction(cell, next_cell, html_element, next_html_element, 3, 1);
        }
        setTimeout(function () {
            game_el.lab_construction(next_cell);
        }, 100);
    } else {
        if (game_el.lab_path.length != 0) {
            var prevcell = game_el.lab_path[game_el.lab_path.length - 1];
            game_el.lab_path.splice(game_el.lab_path.length - 1, 1);
            setTimeout(function () {
                game_el.lab_construction(prevcell);
            }, 100);
        }
    }
}

game_el.border_construction = function (cell, next_cell, html_element, next_html_element, border, next_border) {
    var border_name = game_el.cell.borders_name[border];
    var next_border_name = game_el.cell.borders_name[next_border];
    cell.borders[border] = 0;
    next_cell.borders[next_border] = 0;
    html_element.classList.remove(border_name);
    next_html_element.classList.remove(next_border_name);
}

game_el.init_tab = function (size) {
    var _tab = new Array(size);
    for (var i = 0; i < size; i++) {
        _tab[i] = new Array(size);
        var _row = document.createElement('div');
        _row.className = 'row';
        for (var j = 0; j < _tab[i].length; j++) {
            var cell = JSON.parse(JSON.stringify(game_el.cell));
            cell.position.x = i;
            cell.position.y = j;
            _tab[i][j] = cell;
            var _case = document.createElement('div');
            _case.className = 'case top right bottom left';
            _case.style.width = game_el.lab_construction_size;
            _case.style.height = game_el.lab_construction_size;
            _row.appendChild(_case);
        }
        game_el.container.appendChild(_row);
    }
    return _tab;
}

game_el.tab = game_el.init_tab(game_el.size);
game_el.lab_construction(game_el.tab[Math.floor(Math.random() * game_el.tab.length)][Math.floor(Math.random() * game_el.tab.length)]);