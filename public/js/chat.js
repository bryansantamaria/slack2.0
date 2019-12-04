import { ChatModule } from "./chat-module.js";

let chatModule = new ChatModule(
    'Aliquam elit eros, suscipit quis semper eget, consectetur eget nisi. Donec consectetur quis nibh eget viverra. Aenean pulvinar mollis arcu, porta faucibus nibh pellentesque sit amet. Ut non tristique lorem, ut maximus mi. Quisque iaculis elit sed risus ultrices, blandit iaculis neque scelerisque.', 
    'Fabian Johansson',
    'https://images.unsplash.com/photo-1529778873920-4da4926a72c2?ixlib=rb-1.2.1&w=1000&q=80',
    '11:26'
);

let chatModule2 = new ChatModule(
    'Aliquam elit eros, suscipit quis semper eget, consectetur eget nisi. Donec consectetur quis nibh eget viverra. Aenean pulvinar mollis arcu, porta faucibus nibh pellentesque sit amet. Ut non tristique lorem, ut maximus mi. Quisque iaculis elit sed risus ultrices, blandit iaculis neque scelerisque.', 
    'Bryan Santamaria',
    'https://icon-library.net/images/icon-for-user/icon-for-user-8.jpg',
    '11:26'
);

let chatModule3 = new ChatModule(
    'Aliquam elit eros, suscipit quis semper eget, consectetur eget nisi. Donec consectetur quis nibh eget viverra. Aenean pulvinar mollis arcu, porta faucibus nibh pellentesque sit amet. Ut non tristique lorem, ut maximus mi. Quisque iaculis elit sed risus ultrices, blandit iaculis neque scelerisque.', 
    'Alexander Wilson',
    'https://icon-library.net/images/icon-for-user/icon-for-user-8.jpg',
    '11:26'
);

//Globals
let chatGlobals = {
    deleteTarget: undefined,
    editTarget: undefined
}

//Delete events
document.addEventListener('delete-init', e => {
    chatGlobals.deleteTarget = e.detail;
})

document.querySelector('#delete-btn').addEventListener('click', () => {
    chatGlobals.deleteTarget.dispatchEvent(new CustomEvent('delete-confirm', {}));
});

//Edit Events
document.addEventListener('edit-init', e => {
    chatGlobals.editTarget = e.detail;
    document.querySelector('#edit-message').value = chatGlobals.editTarget.textContent;
})

document.querySelector('#edit-btn').addEventListener('click', () => {
    chatGlobals.editTarget.parentNode.dispatchEvent(new CustomEvent('edit-confirm', {
        detail: document.querySelector('#edit-message')
    }));
});


// $(function () {
//     const socket = io();
//     $('user-name').click((e) => {
//         let user = $('newUser').val();
//     });
// })

chatModule.render(document.querySelector('message-root'));
chatModule2.render(document.querySelector('message-root'));
chatModule3.render(document.querySelector('message-root'));