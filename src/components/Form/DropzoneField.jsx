import React, {useEffect, useState} from 'react';
import {useDropzone} from 'react-dropzone';

const thumbsContainer = {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 16
};

const thumb = {
    display: 'inline-flex',
    borderRadius: 2,
    border: '1px solid #eaeaea',
    marginBottom: 8,
    marginRight: 8,
    width: 100,
    height: 100,
    padding: 4,
    boxSizing: 'border-box'
};

const thumbInner = {
    display: 'flex',
    minWidth: 0,
    overflow: 'hidden'
};

const img = {
    display: 'block',
    width: 'auto',
    height: '100%'
};

export default function DropzoneField(props) {
    const maxSize = 1048576;

    const [files, setFiles] = useState([]);

    const { customChange } = props;

    const {getRootProps, getInputProps, isDragActive, isDragReject, acceptedFiles, rejectedFiles} = useDropzone({
        accept: 'image/jpeg, image/png',
        minSize: 0,
        maxSize,
        onDrop: acceptedFiles => {
            setFiles(acceptedFiles.map(file => Object.assign(file, {
                preview: URL.createObjectURL(file)
            })));

            customChange(acceptedFiles);
        }
    });

    const thumbs = files.map(file => (
        <div style={thumb} key={file.name}>
            <div style={thumbInner}>
                <img
                    src={file.preview}
                    style={img}
                />
            </div>
        </div>
    ));

    useEffect(() => () => {
        files.forEach(file => URL.revokeObjectURL(file.preview));
    }, [files]);

    const isFileTooLarge = rejectedFiles.length > 0 && rejectedFiles[0].size > maxSize;

    return (
        <section className="container">
            <div {...getRootProps({className: 'dropzone'})}>
                <input {...getInputProps()} />
                {!isDragActive && 'Нажмите здесь или добавьте файл для загрузки!'}
                {isDragActive && !isDragReject && "Уберите горячо!"}
                {isDragReject && "Тип файла не принят!"}
                {isFileTooLarge && (
                    <div className="text-danger mt-2">
                        Файл слишком большой.
                    </div>
                )}
            </div>
            <aside style={thumbsContainer}>
                {thumbs}
            </aside>
        </section>
    );
}