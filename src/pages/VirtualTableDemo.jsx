// import { useEffect, useRef, useState } from "react";
// import { useVirtualizer } from "@tanstack/react-virtual";

// import { useState } from "react";

// const VirtualTableDemo = () => {

//     const parentRef = useRef(null);
//     const [items, setItems] = useState([]);

//     useEffect(() => {
//         fetch("https://jsonplaceholder.typicode.com/posts")
//             .then(res => res.json())
//             .then(data => {
//                 const bigData = Array.from({ length: 1000 }, (_, i) =>
//                     data.map(item => ({
//                         id: item.id + i * data.length,
//                         title: `${item.title} - ${i}`,
//                     }))
//                 ).flat();

//                 setItems(bigData);
//             });
//     }, []);

//     const rowVirtualizer = useVirtualizer({
//         count: items.length,
//         getScrollElement: () => parentRef.current,
//         estimateSize: () => 50,
//         overscan: 5,
//     });
//     return (
//         <>
//             <h1 style={{ textAlign: "center" }}>
//                 React 19 – Virtualized 100,000 Records
//             </h1>

//             <div
//                 ref={parentRef}
//                 style={{
//                     height: "600px",
//                     overflow: "auto",
//                     border: "1px solid #ddd",
//                 }}
//             >
//                 <div
//                     style={{
//                         height: `${rowVirtualizer.getTotalSize()}px`,
//                         width: "100%",
//                         position: "relative",
//                     }}
//                 >
//                     {rowVirtualizer.getVirtualItems().map(row => {

//                         const item = items[row.index];
//                         return (
//                             <div
//                                 key={row.key}
//                                 style={{
//                                     position: "absolute",
//                                     top: 0,
//                                     left: 0,
//                                     width: "100%",
//                                     height: `${row.size}px`,
//                                     transform: `translateY(${row.start}px)`,
//                                     padding: "10px",
//                                     borderBottom: "1px solid #eee",
//                                     background: row.index % 2 ? "#fff" : "#f9f9f9",
//                                 }}
//                             >
//                                 <b>{item.id}</b> — {item.title}
//                             </div>
//                         );
//                     })}
//                 </div>
//             </div>
//         </>
//     )
// }

// export default VirtualTableDemo


// import { useEffect, useState } from "react";
// import { FixedSizeList as List } from "react-window";

// const VirtualTableDemo = () => {
//     const [items, setItems] = useState([]);

//     useEffect(() => {
//         fetch("https://jsonplaceholder.typicode.com/posts")
//             .then(res => res.json())
//             .then(data => {
//                 const bigData = Array.from({ length: 1000 }, (_, i) =>
//                     data.map(item => ({
//                         id: item.id + i * data.length,
//                         title: `${item.title} - ${i}`,
//                     }))
//                 ).flat();
//                 console.log(`bigdata`, bigData)

//                 setItems(bigData);
//             });
//     }, []);

//     const Row = ({ index, style }) => {
//         const item = items[index];
//         if (!item) return null;

//         return (
//             <div
//                 style={{
//                     ...style,
//                     padding: 10,
//                     borderBottom: "1px solid #ddd",
//                     background: index % 2 ? "#fff" : "#f5f5f5",
//                 }}
//             >
//                 <b>{item.id}</b> — {item.title}
//             </div>
//         );
//     };

//     return (
//         <>
//             <h2 style={{ textAlign: "center" }}>
//                 react-window v1 – Virtualized List
//             </h2>

//             <List
//                 height={600}
//                 itemCount={items.length}
//                 itemSize={50}
//                 width="100%"
//             >
//                 {Row}
//             </List>
//         </>
//     );
// };

// export default VirtualTableDemo;

import { useState } from "react";
import { FixedSizeList as List } from "react-window";

const Row = ({ index, style }) => (
    <div style={style}>
        <p>Block {index}</p>
    </div>
);

const VirtualTableDemo = () => {
    const [load, setLoad] = useState(false);

    return (
        <>
            <h1>Window Example</h1>
            <button onClick={() => setLoad(true)}>Load Data</button>

            {load && (
                <List
                    height={500}
                    width="100%"
                    itemCount={100000}
                    itemSize={40}
                >
                    {Row}
                </List>
            )}

            {/* {
                load && (
                    <div className="App">{
                        Array.from({ length: 100000 }, (_, i) => (
                            <div key={i}>Block {i}</div>
                        ))
                    }</div>
                )
            } */}
        </>
    );
};

export default VirtualTableDemo;








