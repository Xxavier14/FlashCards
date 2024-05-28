import './menu.css'
export function Menu (){

    const downloadFile = (fileName) => {
        const filePath = `/src/${fileName}.json`;

        fetch(filePath)
            .then(response => {
                if (response.ok) {
                    return response.blob();
                } else {
                    throw new Error('File not found');
                }
            })
            .then(blob => {
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `${fileName}.json`;
                document.body.appendChild(a);
                a.click();
                a.remove();
            })
            .catch(error => {
                console.error('Error downloading the file:', error);
            });
    };


    return (
        <div className="containerMenu">
            <h3 className='headMenu'>Plantillas de ejemplo:</h3>
            <h2 onClick={() => downloadFile('PreguntasArte')}>Arte</h2>
            <h2 onClick={() => downloadFile('PreguntasFutbol')}>Fútbol</h2>
            <h2 onClick={() => downloadFile('PreguntasHistoria')}>Historia</h2>
        </div>
    )
}