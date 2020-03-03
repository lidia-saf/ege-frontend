import * as React from 'react';
import '../styles/index.css';
import axios from 'axios';

interface Props {}

interface State {
    data: Data[];
    id: number;
    message: null | string;
    idToDelete: null | string;
    idToUpdate: null | string;
    objectToUpdate: null | number;
    updateToApply: string;
}

interface Data {
    id: number;
    message: string;
    _id: string;
}

class OldApp extends React.Component<Props, State> {
    public constructor(props: Props) {
        super(props);
        this.state = {
            data: [],
            id: 0,
            message: null,
            idToDelete: null,
            idToUpdate: null,
            objectToUpdate: null,
            updateToApply: ''
        };
    }

    public componentDidMount() {
        this.getDataFromDb();
    }

    private getDataFromDb() {
        fetch('http://localhost:3000/api/getData')
            .then(data => data.json())
            .then(res => {
                this.setState({ data: res.data });
            });
    }

    private putDataToDb = (message: string | null) => {
        let currentIds = this.state.data.map(data => data.id);
        let idToBeAdded = 0;
        while (currentIds.includes(idToBeAdded)) {
            ++idToBeAdded;
        }

        axios.post('http://localhost:3000/api/putData', {
            message,
            id: idToBeAdded
        });
    }

    private deleteFromDb = (idToDelete: string | null) => {
        let parsedId = idToDelete ? parseInt(idToDelete, 10) : idToDelete;
        let objIdToDelete = null;
        this.state.data.forEach((dat) => {
            if (dat.id === parsedId) {
                objIdToDelete = dat._id;
            }
        });

        axios.delete('http://localhost:3000/api/deleteData', {
            data: {
                id: objIdToDelete
            }
        });
    }

    private updateDb = (idToUpdate: string | null, updateToApply: string | null) => {
        let objIdToUpdate = null;
        let parsedId = idToUpdate ? parseInt(idToUpdate, 10) : idToUpdate;
        this.state.data.forEach((dat) => {
            if (dat.id === parsedId) {
                objIdToUpdate = dat._id;
            }
        });

        axios.post('http://localhost:3000/api/updateData', {
            id: objIdToUpdate,
            update: { message: updateToApply }
        });
    }

    render() {
        const { data } = this.state;
        return (
            <div>
                <ul>
                    {data.length <= 0
                        ? 'NO DB ENTRIES YET'
                        : data.map((dat) => (
                            <li style={{ padding: '10px' }} key={data.message}>
                            <span style={{ color: 'gray' }}> id: </span> {dat.id} <br />
                            <span style={{ color: 'gray' }}> data: </span>
                            {dat.message}
                            </li>
                        ))}
                    </ul>
                    <div style={{ padding: '10px' }}>
                    <input
                        type='text'
                        onChange={(e) => this.setState({ message: e.target.value })}
                        placeholder='add something in the database'
                        style={{ width: '200px' }}
                    />
                    <button onClick={() => this.putDataToDb(this.state.message)}>
                        ADD
                    </button>
                    </div>
                    <div style={{ padding: '10px' }}>
                    <input
                        type='text'
                        style={{ width: '200px' }}
                        onChange={(e) => this.setState({ idToDelete: e.target.value })}
                        placeholder='put id of item to delete here'
                    />
                    <button onClick={() => this.deleteFromDb(this.state.idToDelete)}>
                        DELETE
                    </button>
                    </div>
                    <div style={{ padding: '10px' }}>
                    <input
                        type='text'
                        style={{ width: '200px' }}
                        onChange={(e) => this.setState({ idToUpdate: e.target.value })}
                        placeholder='id of item to update here'
                    />
                    <input
                        type='text'
                        style={{ width: '200px' }}
                        onChange={(e) => this.setState({ updateToApply: e.target.value })}
                        placeholder='put new value of the item here'
                    />
                    <button
                        onClick={() =>
                        this.updateDb(this.state.idToUpdate, this.state.updateToApply)
                        }
                    >
                        UPDATE
                    </button>
                    </div>
            </div>
        );
    }
}

export default OldApp;
