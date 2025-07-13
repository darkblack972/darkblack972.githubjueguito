<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Examen Paso a Paso con Temporizador</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 20px; }
        #exam-container { display: none; }
        .question { margin-bottom: 20px; }
        .options input { margin-right: 10px; }
        .blank { width: 200px; padding: 5px; }
        button { margin: 10px 0; padding: 5px 10px; }
        #timer { font-size: 18px; color: red; margin-bottom: 10px; }
        pre { background: #f4f4f4; padding: 10px; border: 1px solid #ddd; overflow-x: auto; }
    </style>
</head>
<body>
    <button onclick="startExam()">Iniciar Examen</button>
    <div id="exam-container"></div>
    <div id="timer"></div>

    <script>
        const questions = [
            {
                text: "1. Las Subconsultas son: (Seleccione una opción)",
                options: [
                    { text: "A) Expresiones de agrupamientos en el select", correct: false },
                    { text: "B) Consulta en la lista de campos o en el filtro del select", correct: true },
                    { text: "C) Funciones de agregados para sumatorias", correct: false },
                    { text: "D) Elementos de otra tabla", correct: false }
                ],
                answer: null
            },
            {
                text: "2. Las funciones definidas por el usuario: (Seleccione una opción)",
                options: [
                    { text: "E) Son las funciones de texto y agregados de SQL Server", correct: false },
                    { text: "F) Reportan siempre suma de registro", correct: false },
                    { text: "G) Se puede usar como agregados", correct: false },
                    { text: "H) Retornan un valor o una tabla", correct: true }
                ],
                answer: null
            },
            {
                text: "3. Para poder indexar una visita se debe incluir en la definición: (Seleccione una opción)",
                options: [
                    { text: "I) El esquema de la tabla origen únicamente", correct: false },
                    { text: "J) El esquema de la tabla origen y la cláusula SchemaBinding", correct: true },
                    { text: "K) No se puede indizar una vista", correct: false },
                    { text: "L) La cláusula Encryption", correct: false }
                ],
                answer: null
            },
            {
                text: "4. Para filtrar un campo con función de agregado se usa ………. y para filtrar un campo sin función de agregado se usa …………",
                blanks: ["Having", "Where"],
                answer: [null, null]
            },
            {
                text: "5. Para el listado de las tablas producto y categorías. cuyo FK es por el campo CategoriaCodigo: (Seleccione una opción)",
                options: [
                    { text: "M) Select * from productos As P join Categorias As C on P.CategoryID = C:CategoriaID", correct: false },
                    { text: "N) Select * from productos As P join Categorias As C on P.CategoryCodigo = P.CategoriasCodigo", correct: false },
                    { text: "O) Select * from productos As P join Categorias As C on P.CategoryCodigo = C.CategoriasCodigo", correct: true },
                    { text: "P) Ninguna de las anteriores", correct: false }
                ],
                answer: null
            },
            {
                text: "6. Son las funciones fijas del servidor y de base de datos cuyos miembros tienen todos los permisos: (Seleccione una opción)",
                options: [
                    { text: "Q) Sys_admin y dbowner", correct: false },
                    { text: "R) Sys_admin y db_admin", correct: false },
                    { text: "S) Sysadmin y db_sysadmin", correct: false },
                    { text: "T) Sysadmin y db_owner", correct: true }
                ],
                answer: null
            },
            {
                text: "7. La siguiente instrucción reporta: Select Upper(SUBSTRING(‘Examen Final Datos 2’, 8,7)): (Seleccione una opción)",
                options: [
                    { text: "U) final D", correct: false },
                    { text: "V) error", correct: false },
                    { text: "W) Examen Final", correct: false },
                    { text: "X) Final D", correct: true }
                ],
                answer: null
            },
            {
                text: "8. El siguiente bloque de código: (Seleccione una opción)",
                code: "Declare @Datos table (\nCódigo nchar(3) Descripción nchar(50)\n)\ngo\n\ninsert into @Datos values (‘001’, ‘Escritorio’),(‘002’, ‘Ventilador’),(‘334’, ‘Pizarra’),(‘556’, ‘Monitor’),(‘357’, ‘Mouse’)\nSelect * from @Datos\ngo",
                options: [
                    { text: "Y) Listar los registros insertados en la variable tipo tabla @Datos", correct: true },
                    { text: "Z) Insertar registro en la tabla datos", correct: false },
                    { text: "AA) Reportar error", correct: false },
                    { text: "BB) No muestran nada", correct: false }
                ],
                answer: null
            },
            {
                text: "9. Para crear un esquema partición y repartir las particiones en los grupos de archivos de la base de datos se usa: (Seleccione una opción)",
                options: [
                    { text: "A) Create partition function GuiasRemisionEsquemaParticion As PartitionGuiasRemisionFuncionParticion to([PRIMARY],[CONTABILIDAD] COMERCIAL,PLANIFICACIÓN)", correct: false },
                    { text: "B) Create partition Scheme GuiasRemisionEsquemaParticion As range for values to ([PRIMARY],[CONTABILIDAD] COMERCIAL,COMERCIAL,PLANIFICACIÓN)", correct: false },
                    { text: "C) Create partition Scheme GuiasRemisionEsquemaParticion As partition GuiasRemisionFuncionParticion to ([PRIMARY],[CONTABILIDAD] COMERCIAL,PLANIFICACIÓN)", correct: true },
                    { text: "D) Create partition function GuiasRemisionEsquemaParticion As range for values (‘E’,’J’,’O’,‘T’)", correct: false }
                ],
                answer: null
            },
            {
                text: "10. Si la instrucción select de un cursor llamado cursorPrroducyosCompra es: Select P.ProductID, P.ProductName, P.UnitsInStock, P.UnitsOnOrder from dbo.Products As P, cual es la instrucción para leer los registros: (Seleccione una opción)",
                options: [
                    { text: "A) Fetch cursorProductosCompra to @Codigo, @Descripcion, @Stock, @EnOrden", correct: false },
                    { text: "B) Fetch cursor cursorProductosCompra into (@Codigo, @Descripcion, @Stock, @EnOrden)", correct: false },
                    { text: "C) Fetch cursor cursorProductosCompra into @Codigo, @Descripcion, @Stock, @EnOrden", correct: true },
                    { text: "D) Fetch cursor cursorProductosCompra from @Codigo, @Descripcion, @Stock, @EnOrden", correct: false }
                ],
                answer: null
            },
            {
                text: "11. Para crear un inicio de sesión con la cuenta de windows llamada jefe del equipo Londres se utiliza: (Seleccione una opción)",
                options: [
                    { text: "A) Create login jefe from Windows\\Londres", correct: false },
                    { text: "B) Create login jefe from[Londres\\jefe]", correct: false },
                    { text: "C) create login [Londres\\jefe] with password = ‘123’", correct: false },
                    { text: "D) create login [Londres\\jefe] from windows", correct: true }
                ],
                answer: null
            },
            {
                text: "12. Suponiendo que se tiene la BD abierta, la siguiente instrucción reporta: (Seleccione una opción)",
                code: "Select\nC.CategoryID As ‘Codigo’, C.CategoryName As ‘Categoria’\nCOUNT(P.ProductID) As ‘Cantidad de productos’ from Northwind dbo.Categories As C\njoin dbo.Products As P on C.CategoryID = P.CategoryID group by C.CategoryID\ngo",
                options: [
                    { text: "A) Lista las categorías y la cantidad de productos por cada categoría", correct: false },
                    { text: "B) Lista las categorías y la suma de productos por cada categoría", correct: false },
                    { text: "C) Reportar error", correct: true },
                    { text: "D) Lista los productos de cada categoría", correct: false }
                ],
                answer: null
            },
            {
                text: "13. Respecto al uso de vistas, seleccione la que no es correcta: (Seleccione una opción)",
                options: [
                    { text: "A) Me ocupan espacio en la base de datos", correct: true },
                    { text: "B) Pueden contener información de varias tablas", correct: false },
                    { text: "C) No se puede encriptar", correct: false },
                    { text: "D) Pueden tener hasta 1024 campos", correct: false }
                ],
                answer: null
            },
            {
                text: "14. Para insertar con el asistente de SQL Server información desde una hoja de Excel, seleccione las opciones correctas:",
                options: [
                    { text: "A) Los datos deberían tener sus títulos de campos en una sola fila", correct: true },
                    { text: "B) Pueden importarse hasta 5000 registros", correct: false },
                    { text: "C) Se usa el asistente de importación de Microsoft Excel", correct: true },
                    { text: "D) Debe guardarse en archivo de Excel en formato 97, 2003", correct: false }
                ],
                multiple: true,
                answer: []
            },
            {
                text: "15. Teniendo el SQLCommand creado en Visual Studio, el método para ejecutar este y el tipo de parámetro que es necesario para capturar el valor de retorno es: (Seleccione una opción)",
                options: [
                    { text: "A) ExecuteQuery y ReturnValue", correct: false },
                    { text: "B) ExecuteNonQuery y Return_Value", correct: true },
                    { text: "C) ExecuteNonQuery y @Resultado", correct: false },
                    { text: "D) EndExecuteNonQuery y Return_Value", correct: false }
                ],
                answer: null
            },
            {
                text: "16. La herramienta SQL SERVER Profiler: (Seleccione una opción)",
                options: [
                    { text: "A) Guarda los eventos seleccionados según la plantilla para utilizarlos en la optimización del motor de base de datos", correct: true },
                    { text: "B) Guardar los registros seleccionados según la plantilla para utilizarlos en la optimización del motor de base de datos", correct: false },
                    { text: "C) Guardar los registros en una base para analizar el rendimiento", correct: false },
                    { text: "D) Crea planes de mantenimiento para optimizar la BD", correct: false }
                ],
                answer: null
            },
            {
                text: "17. La propiedad para que un formulario sea formulario padre en Visual Studio es IsMdiContainer: (Seleccione una opción)",
                options: [
                    { text: "VERDADERO", correct: true },
                    { text: "FALSO", correct: false }
                ],
                answer: null
            },
            {
                text: "18. Para definir un parámetro (SQLParameter) en Visual Studio para un campo de tipo nvarchar de tamaño 40, se debe especificar: (Seleccione una opción)",
                options: [
                    { text: "A) Nombre y Tipo de dato", correct: false },
                    { text: "B) Nombre, Tipo de dato, tamaño, Dirección y Valor", correct: true },
                    { text: "C) Nombre, Tipo de dato y Valor", correct: false },
                    { text: "D) Nombre, Tipo de dato, Direccion", correct: false }
                ],
                answer: null
            },
            {
                text: "19. La FDU siguiente: (Seleccione una opción)",
                code: "Create or alter function dbo.fduSumaItemsStockPorCategoria(@CodigoCategoria int) returns int with encryption\nAs Begin\nDeclare @CantidadItems int\nset @CantidadItems = (Select SUM(P.UnitsInStock) from dbo.Products As P Where P.CategoryID = @CodigoCategoria )\nreturn @CantidadItems\nEnd\ngo",
                options: [
                    { text: "A) Suma las unidades en Stock de las categorías", correct: false },
                    { text: "B) Suma las unidades en Stock de los productos de una categoría", correct: true },
                    { text: "C) Suma todas las unidades en orden de cada producto", correct: false },
                    { text: "D) Cuenta las unidades en Stock de cada productos por categoría", correct: false }
                ],
                answer: null
            },
            {
                text: "20. Para que un campo en la tabla se compruebe el ingreso de valores definidos y para definir integridad de datos entre las tablas se deben especificar las restricciones siguientes: (Seleccione una opción)",
                options: [
                    { text: "a) default y Unique", correct: false },
                    { text: "b) Unique y default", correct: false },
                    { text: "c) check, primary key", correct: false },
                    { text: "d) check, foreign key", correct: true }
                ],
                answer: null
            }
        ];

        let currentQuestion = 0;
        let timeLeft = 600; // 10 minutos en segundos
        let shuffledQuestions = [];

        function startExam() {
            document.getElementById('exam-container').style.display = 'block';
            document.querySelector('button').style.display = 'none';
            shuffledQuestions = [...questions].sort(() => Math.random() - 0.5);
            shuffledQuestions.forEach(q => {
                if (q.options) {
                    q.options.sort(() => Math.random() - 0.5);
                }
            });
            startTimer();
            showQuestion();
        }

        function startTimer() {
            const timer = document.getElementById('timer');
            timer.textContent = `Tiempo restante: ${Math.floor(timeLeft / 60)}:${timeLeft % 60 < 10 ? '0' : ''}${timeLeft % 60}`;

            const interval = setInterval(() => {
                timeLeft--;
                timer.textContent = `Tiempo restante: ${Math.floor(timeLeft / 60)}:${timeLeft % 60 < 10 ? '0' : ''}${timeLeft % 60}`;
                if (timeLeft <= 0) {
                    clearInterval(interval);
                    calculateScore();
                }
            }, 1000);
        }

        function showQuestion() {
            const container = document.getElementById('exam-container');
            container.innerHTML = '';

            if (currentQuestion < shuffledQuestions.length) {
                const q = shuffledQuestions[currentQuestion];
                const div = document.createElement('div');
                div.className = 'question';
                div.innerHTML = `<h3>${currentQuestion + 1}. ${q.text}</h3>`;

                if (q.code) {
                    const codeBlock = document.createElement('pre');
                    codeBlock.textContent = q.code;
                    div.appendChild(codeBlock);
                }

                if (q.options) {
                    q.options.forEach((opt, i) => {
                        const label = document.createElement('label');
                        const input = document.createElement('input');
                        input.type = q.multiple ? 'checkbox' : 'radio';
                        input.name = `q${currentQuestion}`;
                        input.value = opt.text;
                        input.onclick = () => {
                            if (!q.multiple) q.answer = opt.text;
                            else {
                                if (!q.answer) q.answer = [];
                                const index = q.answer.indexOf(opt.text);
                                if (index === -1) q.answer.push(opt.text);
                                else q.answer.splice(index, 1);
                            }
                        };
                        label.appendChild(input);
                        label.appendChild(document.createTextNode(` ${opt.text}`));
                        div.appendChild(label);
                        div.appendChild(document.createElement('br'));
                    });
                } else if (q.blanks) {
                    q.blanks.forEach((blank, i) => {
                        const input = document.createElement('input');
                        input.type = 'text';
                        input.className = 'blank';
                        input.placeholder = `Blanco ${i + 1}`;
                        input.onchange = (e) => {
                            if (!q.answer) q.answer = [];
                            q.answer[i] = e.target.value;
                        };
                        div.appendChild(input);
                        div.appendChild(document.createElement('br'));
                    });
                }

                const button = document.createElement('button');
                button.textContent = currentQuestion === shuffledQuestions.length - 1 ? 'Enviar' : 'Siguiente';
                button.onclick = () => {
                    if (currentQuestion < shuffledQuestions.length - 1) {
                        currentQuestion++;
                        showQuestion();
                    } else {
                        calculateScore();
                    }
                };
                div.appendChild(button);

                container.appendChild(div);
            }
        }

        function calculateScore() {
            let score = 0;
            shuffledQuestions.forEach((q, i) => {
                if (q.options) {
                    if (q.multiple) {
                        const correct = q.options.filter(o => o.correct).map(o => o.text);
                        if (JSON.stringify(q.answer?.sort()) === JSON.stringify(correct.sort())) score++;
                    } else {
                        const correct = q.options.find(o => o.correct)?.text;
                        if (q.answer === correct) score++;
                    }
                } else if (q.blanks) {
                    if (q.answer && q.answer.every((a, i) => a.toLowerCase() === q.blanks[i].toLowerCase())) score++;
                }
            });
            document.getElementById('exam-container').innerHTML = `<h3>Tu puntaje es: ${score} de 20</h3>`;
            alert(`Tu puntaje es: ${score} de 20`);
        }
    </script>
</body>
</html>
