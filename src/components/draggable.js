
    export function apply_drag_to_initial_components () {
        [...document.querySelectorAll('.js-draggable')].forEach( function ( draggable_box ) {
            apply_drag_functionality ( draggable_box );
        } );    
    }

    function apply_drag_functionality ( draggable_box ) {
        const draggable_box_trigger = draggable_box.classList.contains('js-draggable-trigger') ? draggable_box : draggable_box.querySelector('.js-draggable-trigger');

        if ( draggable_box_trigger ) {
            let starting_x = null,
                starting_y = null,
                can_be_dragged = false,
                new_x = null,
                new_y = null;

            draggable_box.setAttribute('data-prev-x', "0");
            draggable_box.setAttribute('data-prev-y', "0");

            draggable_box_trigger.addEventListener( 'mousedown', function ( event ) {
                can_be_dragged = true;
                starting_x = event.clientX;
                starting_y = event.clientY;
            } );

            window.addEventListener('mousemove', function ( event ) {
                if ( can_be_dragged ) {
                    new_x = event.clientX - starting_x;
                    new_y = event.clientY - starting_y;

                    draggable_box.style.transform = `translate(${ new_x + parseInt( draggable_box.dataset.prevX ) }px, ${ new_y + parseInt( draggable_box.dataset.prevY ) }px) scale(1)`;
                }
            } );

            window.addEventListener( 'mouseup', function () {
                can_be_dragged = false;
                draggable_box.setAttribute('data-prev-x', new_x + parseInt( draggable_box.dataset.prevX ) );
                draggable_box.setAttribute('data-prev-y', new_y + parseInt( draggable_box.dataset.prevY ) );
                new_x = new_y = 0;
            } );
        }
    }