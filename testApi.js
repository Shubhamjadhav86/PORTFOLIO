async function testFast() {
    try {
        console.log("1. Logging in...");
        const loginRes = await fetch(`${process.env.BASE_URL || 'http://127.0.0.1:5000'}/api/admin/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ password: 'S2World' })
        });
        const loginData = await loginRes.json();
        console.log("Login:", loginRes.status, loginData);
        
        if (!loginData.token) return;
        const token = loginData.token;

        console.log("2. Creating project...");
        const createRes = await fetch(`${process.env.BASE_URL || 'http://127.0.0.1:5000'}/api/projects`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                title: 'Test Proj',
                description: 'Desc',
                techStack: ['React'],
                image: '',
                liveLink: '',
                githubLink: ''
            })
        });
        const createData = await createRes.json();
        console.log("Create Project:", createRes.status, createData);

        if (createData._id) {
            console.log("3. Deleting project...");
            const delRes = await fetch(`${process.env.BASE_URL || 'http://127.0.0.1:5000'}/api/projects/${createData._id}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            });
            const delData = await delRes.text();
            console.log("Delete Project:", delRes.status, delData);
        }
        
    } catch(err) {
        console.error(err);
    }
}
testFast();
