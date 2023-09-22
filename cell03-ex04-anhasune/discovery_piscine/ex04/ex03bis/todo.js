const mainDivElement = $("#ft_list");
const newButton = $("#createTaskButton");

let divCount = 1;

function loadCookie() {
    const cookies = document.cookie.split(';');
    let ftListCookie = null;

    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();

        if (cookie.startsWith('ft_list=')) {
            ftListCookie = cookie;
            break;
        }
    }

    if (ftListCookie) {
        const ftListValue = decodeURIComponent(ftListCookie.substring('ft_list='.length));
        mainDivElement.html(ftListValue);

        const listItems = mainDivElement.find('li');
        listItems.each(function() {
            $(this).on("click", function() {
                const todoDivName = $(this).html();
                const shouldDelete = confirm(`Delete the current to-do list [${todoDivName}]?`);

                if (shouldDelete) {
                    $(this).remove();
                    if (mainDivElement.html().trim() === '') {
                        document.cookie = 'ft_list=; expires=Thu, 01 Jan 1970 00:00:00 UTC;';
                    } else {
                        document.cookie = `ft_list=${encodeURIComponent(mainDivElement.html())};`;
                    }
                }
            });
        });
    }
}
loadCookie();

function createTask() {
    const todoDiv = $("<li>");
    const todoInput = window.prompt("Add ? to ft_list/to-do list");

    if (todoInput == null || todoInput === ''){
        return
    }

    todoDiv.html(todoInput);

    todoDiv.on("click", function() {
        const todoDivName = $(this).html()
        const shouldDelete = confirm(`Delete the current to-do list [${todoDivName}]?`);

        if (shouldDelete) {
            $(this).remove();
            if (mainDivElement.html().trim() === '') {
                document.cookie = 'ft_list=; expires=Thu, 01 Jan 1970 00:00:00 UTC;';
            } else {
                document.cookie = `ft_list=${encodeURIComponent(mainDivElement.html())};`;
            }
        }
    });

    mainDivElement.prepend(todoDiv);
    document.cookie = `ft_list=${encodeURIComponent(mainDivElement.html())};`;
}

newButton.on("click", createTask);