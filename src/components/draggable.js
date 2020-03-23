
    let window_header_offset,
        header_offset_is_defined = false;

    export function apply_drag_to_initial_components () {
        [...document.querySelectorAll('.js-draggable')].forEach( function ( draggable_box ) {
            apply_drag_functionality ( draggable_box );
        } );    
    }

    export function apply_drag_functionality ( draggable_box ) {
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
                    if ( !header_offset_is_defined ) set_header_offset();

                    new_x = event.clientX - starting_x;
                    new_y = event.clientY - starting_y;

                    let true_transform_x = new_x + parseInt( draggable_box.dataset.prevX ),
                        true_transform_y = new_y + parseInt( draggable_box.dataset.prevY );

                    true_transform_x = check_if_box_at_horizontal_bounds( draggable_box, true_transform_x );
                    true_transform_y = check_if_box_at_vertical_bounds( draggable_box, true_transform_y );

                    draggable_box.style.transform = `translate3d(${ true_transform_x }px, ${ true_transform_y }px, 0)`;
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

    function check_if_box_at_horizontal_bounds ( draggable_box, true_transform_x ) {
        if ( true_transform_x + draggable_box.offsetLeft < 0 ) {
            return true_transform_x -= true_transform_x + draggable_box.offsetLeft;
        } else if ( true_transform_x + draggable_box.offsetLeft + draggable_box.offsetWidth > window.innerWidth ) {
            return true_transform_x -= ( true_transform_x + draggable_box.offsetLeft + draggable_box.offsetWidth - window.innerWidth );
        }

        return true_transform_x;
    }

    function check_if_box_at_vertical_bounds ( draggable_box, true_transform_y ) {
        if ( true_transform_y + draggable_box.offsetTop < 0 ) {
            return true_transform_y -= true_transform_y + draggable_box.offsetTop;
        } else if ( true_transform_y + draggable_box.offsetTop + draggable_box.offsetHeight + window_header_offset > window.innerHeight ) {
            return true_transform_y -= ( true_transform_y + draggable_box.offsetTop + draggable_box.offsetHeight + window_header_offset - window.innerHeight );
        }

        return true_transform_y;
    }

    function set_header_offset () {
        header_offset_is_defined = true;
        window_header_offset = document.querySelector('.js-draggable-header-offset').offsetHeight;
    }

    window.addEventListener('resize', function () {
        window_header_offset = set_header_offset();
    } );

 