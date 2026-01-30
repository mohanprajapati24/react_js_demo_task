import React from 'react'
import { FixedSizeGrid as Grid } from 'react-window'

const ImageLayout = () => {
    const images = Array.from({ length: 10000 }, (_, i) =>
        `https://picsum.photos/300/300?random=${i}`
    );

    const COLUMN_COUNT = 4;
    const ROW_HEIGHT = 250;
    const COLUMN_WIDTH = 250;
    const rowCount = Math.ceil(images.length / COLUMN_COUNT)
    return (
        <div>
            <Grid
                columnCount={COLUMN_COUNT}
                columnWidth={COLUMN_WIDTH}
                height={600}
                rowCount={rowCount}
                rowHeight={ROW_HEIGHT}
                width={1000}
            >
                {
                    ({
                        columnIndex, rowIndex, style
                    }) => {
                        // console.log('rowIndex: ', rowIndex);
                        const index = rowIndex * COLUMN_COUNT + columnIndex;
                        // console.log('index: ', index);

                        if (index >= images.length) return null;

                        return (
                            <div style={style}>
                                <img
                                    src={images[index]}
                                    alt=''
                                    loading='lazy'
                                    style={{
                                        width: "100%", height: "100%", objectFit: "cover"
                                    }}
                                />
                            </div>
                        )
                    }
                }

            </Grid>

        </div>
    )
}

export default ImageLayout
