import React, { FC } from 'react';
import { withNativeProps, NativeProps } from '@/utils/native-props';
import { mergeProps } from '@/utils/with-default-props';
import classNames from 'classnames';

const classPrefix = `theMoment-steps`;
const stepClassPrefix = `theMoment-step`;

const defaultIcon = <span className={`${stepClassPrefix}-icon-dot`} />

type Direction = 'horizontal' | 'vertical' | 'turning';

export type StepsProps = {
    current?: number;
    direction?: Direction;
    children?: React.ReactNode;
} & NativeProps<
    | '--title-font-size'
    | '--description-font-size'
    | '--indicator-margin-right'
    | '--icon-size'
>

const reverseDom = (num: number) => {
    if ((num - 4) % 6 === 0) {
        return num + 2;
    } else if ((num - 6) % 6 === 0) {
        return num - 2;
    } else {
        return num
    }
}

const reverseDirection = (node: React.ReactNode) => {
    const num = React.Children.count(node);
    if ((num - 4) % 6 === 0) {
        return true;
    } else if ((num - 5) % 6 === 0) {
        return true
    } else {
        return false
    }
}

const defaultProps = {
    current: 0,
    direction: 'horizontal',
}

export const Steps: FC<StepsProps> = p => {
    const props = mergeProps({
        ...defaultProps,
        style:{
            '--justify-content': reverseDirection(p.children) ? 'flex-end' : 'flex-start',
        }
    }, p);
    const { current, direction } = props;
    const classString = classNames(classPrefix, `${classPrefix}-${direction}`)

    return withNativeProps(
        props,
        <div className={classString}>
            {React.Children.map(props.children, (child, index) => {
                if (!React.isValidElement<any>(child)) {
                    return child;
                }

                const childProps = child.props;

                let style = child.props.style || {};

                let status = childProps.status || 'wait';

                if (index < current) {
                    status = childProps.status || 'finish';
                } else if (index === current) {
                    status = childProps.status || 'process';
                }

                if (direction === 'turning') {
                    style = {
                        ...style,
                        order: reverseDom(index + 1),
                    }
                }

                const icon = childProps.icon ?? defaultIcon;



                return React.cloneElement(child, {
                    status,
                    icon,
                    style
                })
            })}
        </div>
    )
}