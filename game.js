window.onload = function () {
    function PetriTable(width, height) {
        this.width = width;
        this.height = height;
        this.cells = {};
        this.tableElement = null;

        this.getCell = (x, y) => this.cells[`${x}_${y}`];

        this.createCell = function (element, x, y) {
            const cell = new Cell(element, x, y);
            element.className = 'cell-dead';
            element.addEventListener('click', () => {
                element.className = element.className === 'cell-dead' ? 'cell-alive' : 'cell-dead';
            });
            this.cells[`${x}_${y}`] = cell;
            return cell;
        };

        this.buildTable = function () {
            const table = document.createElement('table');
            table.className = 'grid-table';
            table.id = 'petri-table';

            for (let i = 0; i < width; i++) {
                const row = table.insertRow();
                for (let j = 0; j < height; j++) {
                    const cellElem = row.insertCell();
                    this.createCell(cellElem, i, j);
                }
            }

            document.body.appendChild(table);
            this.tableElement = table;
        };

        this.deleteTable = function () {
            document.getElementById('petri-table')?.remove();
        };

        this.syncViewToModel = function () {
            for (const key in this.cells) {
                const cell = this.cells[key];
                cell.element.className = cell.alive ? 'cell-alive' : 'cell-dead';
            }
        };

        this.syncModelToView = function () {
            for (const key in this.cells) {
                const cell = this.cells[key];
                cell.alive = cell.element.className === 'cell-alive';
            }
        };

        this.buildTable();
    }

    function Cell(element, x, y) {
        this.element = element;
        this.x = x;
        this.y = y;
        this.alive = false;
        this.generation = 0;

        this.getNeighbors = function () {
            const directions = [
                [-1, 0], [1, 0], [0, -1], [0, 1],
                [-1, -1], [-1, 1], [1, -1], [1, 1]
            ];
            return directions.map(([dx, dy]) => [this.x + dx, this.y + dy]);
        };

        this.countAliveNeighbors = function (table) {
            return this.getNeighbors()
                .filter(([nx, ny]) => {
                    const neighbor = table.getCell(nx, ny);
                    return neighbor?.element.className === 'cell-alive';
                }).length;
        };
    }

    function LifeGame(width, height) {
        this.width = width;
        this.height = height;
        this.grid = new PetriTable(width, height);

        this.update = function () {
            this.grid.syncModelToView();

            for (const key in this.grid.cells) {
                const cell = this.grid.cells[key];
                const aliveNeighbors = cell.countAliveNeighbors(this.grid);

                if (cell.alive && (aliveNeighbors < 2 || aliveNeighbors > 3)) {
                    cell.alive = false;
                } else if (!cell.alive && aliveNeighbors === 3) {
                    cell.alive = true;
                } else if (cell.alive) {
                    cell.generation++;
                }
            }

            this.grid.syncViewToModel();
        };
    }

    const width = 80;
    const height = 120;
    let game = new LifeGame(width, height);
    let intervalId;

    document.getElementById('startBtn').addEventListener('click', function () {
        const speed = parseInt(document.getElementById('speedSlider').value);
        game.grid.syncModelToView();
        intervalId = setInterval(() => game.update(), speed);
        this.disabled = true;
    });

    const speedSlider = document.getElementById('speedSlider');
    const speedValue = document.getElementById('speedValue');

    speedSlider.addEventListener('input', function () {
        speedValue.textContent = this.value;
    });

    document.getElementById('resetBtn').addEventListener('click', function () {
        clearInterval(intervalId);
        document.getElementById('startBtn').disabled = false;
        game.grid.deleteTable();
        game = new LifeGame(width, height);
    });
};
