import { RadioButton } from "@/components"

function RadioButtonSection({
    radioBotones,
    className = "flex my-3 gap-2",
    state,
    setState,
    ...props
}){
    return(
        <div className={className} {...props}>
            {radioBotones.map(({value, label, name}) => (
                <RadioButton
                    key={`${name}-${value}`}
                    id={`${name}-${value}`}
                    name={`${name}`}
                    value={`${value}`}
                    label={`${label}`}
                    checked={state === `${value}`}
                    onChange={() => setState(`${value}`)}
                />
            ))}
        </div>
    )
}

export {RadioButtonSection}