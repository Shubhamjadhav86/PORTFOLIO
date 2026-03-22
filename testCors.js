async function testCors() {
    console.log("Testing CORS for DELETE...");
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://127.0.0.1:5000'}/api/projects/123`, {
        method: 'OPTIONS',
        headers: {
            'Origin': 'http://localhost:3000',
            'Access-Control-Request-Method': 'DELETE',
            'Access-Control-Request-Headers': 'Authorization'
        }
    });

    console.log("Status:", res.status);
    console.log("Headers:");
    res.headers.forEach((value, name) => {
        console.log(`${name}: ${value}`);
    });
}
testCors();
