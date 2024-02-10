type State = { Component: any, Props: any, Config: any }

export const stateUpdater = ({ Component, Props = {}, Config = {}, oldState = {} as any }: State & { oldState: State }) => {

    // Append new item with override
    if (Config.override === false) {
        return (() => {
            if (Array.isArray(oldState)) {
                return [...oldState, { Component: Component, Props, Config }]
            }

            if (oldState.Component !== null) {
                return [oldState, { Component: Component, Props, Config }] as any
            }

            return [{ Component: Component, Props, Config }]
        })()
    }

    // Update state Component or delete Component
    return ((oldState: any) => {

        // Delete Component in List
        if (Array.isArray(oldState) && !Component && Config.uuid) {

            console.log({ oldState })

            const newState = oldState.filter(state => state.Config.uuid !== Config.uuid)

            if (newState.length === 0) {
                return { Component: null, Props: {}, Config: {} } as any
            }

            return newState as any
        }

        return { Component: Component || null, Props, Config } as any
    })(oldState)
}