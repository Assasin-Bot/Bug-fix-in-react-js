import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

function App() {
  const [panelOpen, setPanelOpen] = useState(false);

  const [columns, setColumns] = useState({
    column1: { id: 'column1', items: ['Sample_Step1', 'Sample_Step2'] },
    column2: { id: 'column2', items: [] },
    column3: { id: 'column3', items: ['Sample_Step6', 'Sample_Step7'] },
  });

  const tableData = [
    { step: 'Sample_Step1', stepNum: '1', data: 'Enter Text' },
    { step: 'Sample_Step2', stepNum: '2', data: 'Click Button' },
    // ... add more data rows here
  ];

  // const handleDragEnd = (result) => {
  //   // ... logic to move items between columns (explained below)
  // };

  const handleDragEnd = (result) => {
    console.log('handleDragEnd', result);
    const { source, destination } = result;

    // Check if destination is valid
    if (!destination) return;

    // Reorder within the same column
    if (source.droppableId === destination.droppableId) {
      console.log('source.droppableId', source.droppableId);
      // ...implementation for reordering within a column
      const column = columns[source.droppableId];
      const copiedItems = [...column.items]; // Create a copy of the items array
      const [removed] = copiedItems.splice(source.index, 1); // Remove the element
      copiedItems.splice(destination.index, 0, removed); // Insert it at the new position

      setColumns({
        ...columns,
        [source.droppableId]: { ...column, items: copiedItems },
      });
    } else {
      // Moving between columns
      if (
        source.droppableId == 'column3' &&
        destination.droppableId == 'column1'
      ) {
        const sourceColumn = columns[source.droppableId];
        let destColumn = columns['column1'];

        let [removed] = sourceColumn.items.splice(source.index, 1);
        destColumn.items.splice(destination.index, 0, removed);
        setColumns({ ...columns });
        destColumn = columns['column2'];

        destColumn.items.splice(destination.index, 0, removed);
        setColumns({ ...columns });

        return;
      }
      console.log('columns[source.droppableId]', columns[source.droppableId]);
      const sourceColumn = columns[source.droppableId];
      const destColumn = columns[destination.droppableId];
      const [removed] = sourceColumn.items.splice(source.index, 1);
      destColumn.items.splice(destination.index, 0, removed);
      setColumns({ ...columns });
    }
  };

  return (
    <div>
      <DragDropContext onDragEnd={handleDragEnd}>
        <div style={{ display: 'flex' }}>
          <Droppable droppableId="column1">
            {(provided) => (
              <div className = "drag"  {...provided.droppableProps} ref={provided.innerRef}>
                <h5>column 1 header</h5>
                {columns.column1.items.map((item, index) => (
                  <Draggable key={item} draggableId={item} index={index}>
                    {(provided) => (
                      <div
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                      >
                        <p>{item}</p>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
          {/* ... Similar for column2 and column3 */}

          <Droppable droppableId="column2">
            {(provided) => (
              <div className = "drag"  {...provided.droppableProps} ref={provided.innerRef}>
                {/* ... column 1 header */}
                <h5>column 2 header</h5>

                {columns.column2.items.map((item, index) => (
                  <Draggable key={item} draggableId={item} index={index}>
                    {(provided) => (
                      <div
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                      >
                        <p>{item}</p>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}

                <table>
                  <thead>
                    <tr>
                      <th>Flow Steps</th>
                      <th>+T</th>
                      <th>Flow Data</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tableData.map((row, index) => (
                      <tr key={index}>
                        <td>{row.step}</td>
                        <td>T({row.stepNum})</td>
                        <td>{row.data}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </Droppable>

          {/* <Droppable droppableId="column3">
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                <h5>
                  column 3 header{' '}
                  <span onClick={() => setPanelOpen(!panelOpen)}>
                    open panel
                  </span>
                </h5>

                {columns.column3.items.map((item, index) => (
                  <Draggable key={item} draggableId={item} index={index}>
                    {(provided) => (
                      <div
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                      >
                        <p>{item}</p>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable> */}

          <Droppable droppableId="column3">
            {(provided) => (
              <div className = "drag"  {...provided.droppableProps} ref={provided.innerRef}>
                <h5>
                  column 3 header{' '}
                  <span onClick={() => setPanelOpen(!panelOpen)}>
                    open panel
                  </span>
                </h5>

                {panelOpen && (
                  <div className="vertical-panel">
                    {columns.column3.items.map((item, index) => (
                      <Draggable key={item} draggableId={item} index={index}>
                        {(provided) => (
                          <div
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            ref={provided.innerRef}
                          >
                            <p>{item}</p>
                          </div>
                        )}
                      </Draggable>
                    ))}
                  </div>
                )}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>
      </DragDropContext>

      {/* <div style={{ display: ' flex' }}>
        <div>
          <h5>
            column1 <span>+</span>
          </h5>
          <p>
            Sample_Step1 <span>x</span>
          </p>
          <p>
            Sample_Step2 <span>x</span>
          </p>
          <p>
            Sample_Step3 <span>x</span>
          </p>
          <p>
            Sample_Step4 <span>x</span>
          </p>
          <p>
            Sample_Step5 <span>x</span>
          </p>
        </div>
        <div className="table-container">
          <h5>
            column2 <span>+</span>
          </h5>
          <span>+</span>
          <table>
            <thead>
              <tr>
                <th>Flow Steps</th>
                <th>+T</th>
                <th>Flow Data</th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((row, index) => (
                <tr key={index}>
                  <td>{row.step}</td>
                  <td>T({row.stepNum})</td>
                  <td>{row.data}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div>
          <h5>column 3</h5>

          <p>Sample_Step6</p>
          <p>Sample_Step7</p>
          <p>Sample_Step8</p>
          <p>Sample_Step9</p>
          <p>Sample_Step10</p>
        </div>
      </div> */}
    </div>
  );
}

export default App;
