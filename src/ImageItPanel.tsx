import React, { useEffect, useRef, useState } from 'react';
import { PanelProps } from '@grafana/data';
import { SimpleOptions } from 'Types/SimpleOptions';
import { css, cx } from 'emotion';
// import { stylesFactory, useTheme } from '@grafana/ui';
import { stylesFactory } from '@grafana/ui';
import { Sensor } from './Sensor';
import SensorType from './Types/Sensor';

interface Props extends PanelProps<SimpleOptions> {}

export const ImageItPanel: React.FC<Props> = ({ options, data, width, height }) => {
  //  const theme = useTheme();
  const styles = getStyles();

  const imageRef = useRef(null);
  const [imageDimensions, setImageDimensions] = useState({ height: 0, width: 0 });

  useEffect(() => {
    setImageDimensions({
      height: imageRef.current.offsetHeight,
      width: imageRef.current.offsetWidth,
    });
  }, [width, height]);

  const onImageLoad = ({ target: image }: any) => {
    setImageDimensions({
      height: image.offsetHeight,
      width: image.offsetWidth,
    });
  };

  const onSensorPositionChange = (position: any) => {
    console.log(position)
  }

  return (
    <div className={styles.wrapper}>
      <div
        id="imageItBgImage"
        className={cx(
          styles.imageWrapper,
          css`
            max-height: ${height}px;
          `
        )}
      >
        {options.sensors &&
          options.sensors.map((sensor: SensorType, index: number) => {
            return (
              <Sensor draggable={options.lockSensors} sensor={sensor} index={index} imageDimensions={imageDimensions} onPositionChange={onSensorPositionChange}/>
            );
          })}

        <img
          className={cx(
            styles.bgImage,
            css`
              max-height: ${height}px;
            `
          )}
          src={options.imageUrl}
          ref={imageRef}
          onLoad={onImageLoad}
        />
      </div>

      {/* <div className={styles.textBox}>
        {options.showLock && (
          <div
            className={css`
              font-size: ${theme.typography.size[options.sensorTextSize]};
            `}
          >
            Number of series: {data.series.length}
          </div>
        )}
        <div>Text option value: {options.imageUrl}</div>
      </div> */}
    </div>
  );
};

const getStyles = stylesFactory(() => {
  return {
    wrapper: css`
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
    `,
    imageWrapper: css`
      position: relative;
      display: inline-block;
      max-width: 100%;
    `,
    bgImage: css`
      max-width: 100%;
    `,
    lockIcon: css`
      position: absolute;
      top: 25px;
      right: 25px;
      z-index: 1;
    `,
    textBox: css`
      position: absolute;
      bottom: 0;
      left: 0;
      padding: 10px;
    `,
  };
});
