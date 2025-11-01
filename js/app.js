$(document).ready(function() {
    // ======================
    // Event Listeners
    // ======================

    $('#addButton').click(function() {
        addItem();
    });

    $('#itemInput').keypress(function(e) {
        if (e.which === 13) {
            addItem();
        }
    });

    $('#itemList').on('click', '.delete-button', function() {
        deleteItem($(this));
    });

    // ======================
    // Core Functions
    // ======================

    function addItem() {
        const itemText = $('#itemInput').val().trim();

        if (itemText === '') {
            showError();
        } else {
            createListItem(itemText);
            clearInput();
            $('#itemInput').focus();
        }
    }

    function showError() {
        $('#errorMessage').fadeIn(300);

        setTimeout(function() {
            $('#errorMessage').fadeOut(300);
        }, 2000);
    }


    function createListItem(text) {
        $('.empty-state').remove();
        const $newItem = $('<li>', {
            class: 'list-item',
            css: {
                display: 'none'
            }
        });

        const $itemText = $('<span>', {
            class: 'item-text',
            text: text
        });

        const $deleteButton = $('<button>', {
            class: 'delete-button',
            text: 'Delete'
        });

        $newItem.append($itemText).append($deleteButton);
        $('#itemList').append($newItem);

        $newItem.fadeIn(400);
    }

    function deleteItem($button) {
        const $listItem = $button.closest('.list-item');

        $listItem.fadeOut(400, function() {
            $(this).remove();
            checkEmptyState();
        });
    }

    function clearInput() {
        $('#itemInput').val('');
    }

    function checkEmptyState() {
        if ($('#itemList .list-item').length === 0) {
            const $emptyState = $('<div>', {
                class: 'empty-state',
                text: 'No items yet. Add one above!'
            });
            $('#itemList').append($emptyState);
        }
    }
});