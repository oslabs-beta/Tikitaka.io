import * as React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav'
import Form from 'react-bootstrap/Form'
import FormControl from 'react-bootstrap/FormControl'
import Button from 'react-bootstrap/Button'
import {Container,Row,Col} from 'react-bootstrap';
import { Graph } from '@vx/network';
import Bullets from './Bullets';
interface Sup {
    width: number;
    height: number;
    margin: any;
}

const nodes = [
    { x: 50, y: 20 },
    { x: 200, y: 300 },
    { x: 300, y: 40 }
  ];
  const links = [
    { source: nodes[0], target: nodes[1] },
    { source: nodes[1], target: nodes[2] },
    { source: nodes[2], target: nodes[0] }
  ];
  
  const graph = {
    nodes,
    links
  };
  

//===================================================================================================//
//                                          INTERFACE                                                //
//===================================================================================================//
// Typescript: because states are given, need to define as interface
interface IState 
{
    currentTask: string;
    tasks: Array<ITask>
}

interface ITask {
    id: number;
    value: string;
    completed: boolean;
}

                                     // <Props, State>
export class App extends React.Component<{}, IState>{
//===================================================================================================//
//                                          CONSTRUCTOR                                              //
//===================================================================================================//
    constructor(props: {}) {
        super(props);

        // Defining state
        this.state = {
            currentTask: "",
            tasks: []
        }
    }
//===================================================================================================//
//                                            METHODS                                                //
//===================================================================================================//

//=============================================PUBLIC
    public handleSubmit(e: React.FormEvent<HTMLFormElement>): void{
        // Type of e is called = React.FormEvent<HTMLFormElement>
        e.preventDefault();
        this.setState({
            currentTask: "",
            tasks: [
                ...this.state.tasks,
                {
                    id: this._timeInMilliseconds(),
                    value: this.state.currentTask,
                    completed: false
                }
            ]
        })
    }

    public deleteTask(taskId: number): void {
        const filteredTask: Array<ITask> = this.state.tasks.filter(
            (task: ITask) => task.id !== taskId
            );
        this.setState({tasks: filteredTask});
    }

    public toggleDone(index: number): void {
        let task: ITask[] = this.state.tasks.splice(index, 1);
        task[0].completed = !task[0].completed;
        const tasks: ITask[] = [...this.state.tasks, ...task];
        this.setState({tasks});
    }

    public renderTasks(): JSX.Element[] {
        return this.state.tasks.map((task: ITask, index: number) => {
            return (
                <div key={task.id} 
                     className="tdl-task"> 
                <span className={task.completed ? "is-completed" : ""}>{task.value}</span>
                <button onClick={() => this.deleteTask(task.id)}>Delete</button>
            <button onClick={() => this.toggleDone(index)}>{task.completed ? "Undo" : "Done"}</button>
                </div>
            )
        })
    }
//===================================================================================================//
//                                            RENDER                                                 //
//===================================================================================================//
    public render(): JSX.Element{

        return (
        <div className="wrapper">
            <style type="text/css">
                {`
                .container-fluid {
                    padding-right: 15px;
                    padding-left: 15px;
                    margin-right: auto;
                    margin-left: auto;

                    background-color: hsla(0,0%,100%,.96);
                    border-bottom: 1px solid rgba(0,0,0,.1);

                }
                .navbar {
                    display: inline-flex;
                    justify-content: normal;
                    flex-direction: column;
                    height: 100%
                }
                .navbar-nav {
                    width: 170px;
                    z-index: 1;
                    color: #fff;
                    font-weight: 200;
                    background-size: cover;
                    background-position: 50%;
                }
                `}
            </style>

        
            
            {/* APP NAVBAR */}
            <Navbar bg="dark" variant="dark" expand={false}>
                <div className = "logo">
                    <Navbar.Brand href="#home">Tikkitaka</Navbar.Brand>
                </div> 
                <Nav className="mr-auto">
                    <Nav.Link href="#home">Home</Nav.Link>
                    <Nav.Link href="#features">Network</Nav.Link>
                    <Nav.Link href="#pricing">Pricing</Nav.Link>
                </Nav>
            </Navbar>

            {/* APP HEADER */}
            <div id="main-display">

                <Container fluid> 
                <div className="navbar-header">
                    <a href="#pablo" className="navbar-brand">Dashboard</a>
                </div>
                </Container>
                <div className="content">
                    {/* <svg width={700} height={700}>
                    <rect width={650} height={650} rx={14} fill="#272b4d" />
                    <Graph graph={graph} />
        </svg> */}
        
                <Bullets width={800} height={800} margin={{
          top: 30,
          left: 30,
          right: 30,
          bottom: 30
        }} />
                </div>
            </div>

            {/* <Row className="justify-content-md-center">
                <div>
                    <h1>To Do List</h1>
                    <form onSubmit={(e)=> this.handleSubmit(e)}>
                        <input type="text"
                            className="tdl-input"
                            placeholder="Add a task"
                            value={ this.state.currentTask }
                            onChange={(e) => this.setState({ currentTask: e.target.value})}
                        />
                        <button type="submit">Add Task</button>
                    </form>
                    <section> { this.renderTasks() } </section>
                </div>
            </Row> */}
        </div>
        
        );
    }


//=============================================PRIVATE
    private _timeInMilliseconds(): number {
        const date: Date = new Date();
        return date.getTime();
    }
} 
