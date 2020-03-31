import React from 'react';
import Notification from 'rc-notification';
import './index.less';

let defaultDuration = 1.5;
let defaultTop;
let messageInstance;
let key = 1;
let prefixCls = 'g-message';

function getMessageInstance(callback) {
    messageInstance = messageInstance || Notification.newInstance({
        prefixCls,
        transitionName: 'move-up',
        style: { top: defaultTop }, // 覆盖原来的样式
    }, (instance) => {
        if (messageInstance) {
            callback(messageInstance);
            return;
        }
        messageInstance = instance;
        callback(instance);
    });
    return messageInstance;
}

function notice(content, duration = defaultDuration, type, onClose) {
    let target = key++;
    const closePromise = new Promise(resolve => {
        const callback = () => {
            if (typeof onClose === 'function') {
                onClose();
            }
            return resolve(true);
        };
        getMessageInstance(instance => {
            instance.notice({
                key,
                duration,
                style: {},
                content: (
                    <div className={`${prefixCls}-custom-content ${prefixCls}-${type}`}>
                        <span>{content}</span>
                    </div>
                ),
                onClose: callback
            });
        })
    });
    const result = () => {
        if (messageInstance) {
            messageInstance.removeNotice(target);
        }
    };
    result.then = (filled, rejected) => {
        closePromise.then(filled, rejected);
    }
    result.promise = closePromise;
    return result
}

export default {
    info(content, duration, onClose) {
        return notice(content, duration, 'info', onClose);
    },
    success(content, duration, onClose) {
        return notice(content, duration, 'success', onClose);
    },
    error(content, duration, onClose) {
        return notice(content, duration, 'error', onClose);
    },
    // Departed usage, please use warning()
    warn(content, duration, onClose) {
        return notice(content, duration, 'warning', onClose);
    },
    warning(content, duration, onClose) {
        return notice(content, duration, 'warning', onClose);
    },
    loading(content, duration, onClose) {
        return notice(content, duration, 'loading', onClose);
    },
    config(options) {
        if ('top' in options) {
            defaultTop = options.top;
        }
        if ('duration' in options) {
            defaultDuration = options.duration;
        }
        if ('prefixCls' in options) {
            prefixCls = options.prefixCls;
        }
    },
    destroy() {
        if (messageInstance) {
            messageInstance.destroy();
            messageInstance = null;
        }
    },
};