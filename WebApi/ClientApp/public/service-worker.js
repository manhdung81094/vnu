self.addEventListener('push', event => {
    if (event.data) {
        const data = event.data.json();

        // Hiển thị thông báo với dữ liệu từ payload
        // self.registration.showNotification(data.tilte, {
        //     body: data.content,
        //     icon: '/icon.png',
        //     data: data.data  // Đính kèm dữ liệu tùy chỉnh từ payload
        // });
        const options = {
            body: data.content,
            icon: 'https://portal.1school.edu.vn/images/logo.png',
            badge: 'https://portal.1school.edu.vn/images/logo.png'
        };

        event.waitUntil(
            self.registration.showNotification(data.tilte, options)
        );
    }

});

self.addEventListener('notificationclick', event => {
    event.notification.close();
    // Định hướng người dùng đến một trang khi nhấn vào thông báo
    const targetUrl = 'https://chat.1school.edu.vn/chat';
    const groupId = event.notification.data?.groupId ?? "";

    // Điều hướng tới URL với tham số userId
    const urlWithParams = `${targetUrl}/${groupId}`;

    event.waitUntil(
        clients.openWindow(urlWithParams)
    );
    // event.waitUntil(
    //     clients.openWindow('https://chat.1school.edu.vn/chat')
    // );
});
