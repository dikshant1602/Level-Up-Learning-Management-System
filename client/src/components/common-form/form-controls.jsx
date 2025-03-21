import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

function FormControls({ formControls = [], formData, setFormData }) {
    
    function renderComponentByType(getControlItem) {
        let element = null;

        switch (getControlItem.componentType) {
            case 'input':
                element = (
                    <Input
                        id={getControlItem.name}
                        name={getControlItem.name}
                        placeholder={getControlItem.placeholder}
                        type={getControlItem.type}
                        value={formData[getControlItem.name] || ""}
                        onChange={(e) => setFormData({ ...formData, [getControlItem.name]: e.target.value })}
                    />
                );
                break;

            case 'select':
                element = (
                    <Select 
                        value={formData[getControlItem.name] || ""} 
                        onValueChange={(value) => setFormData({ ...formData, [getControlItem.name]: value })}
                    >
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder={getControlItem.label} />
                        </SelectTrigger>
                        <SelectContent>
                            {getControlItem.options && getControlItem.options.length > 0 
                                ? getControlItem.options.map(optionItem => (
                                    <SelectItem key={optionItem.id} value={optionItem.id}>
                                        {optionItem.label}
                                    </SelectItem>
                                ))
                                : null}
                        </SelectContent>
                    </Select>
                );
                break;

            case 'textarea':
                element = (
                    <Textarea
                        id={getControlItem.name}
                        name={getControlItem.name}
                        placeholder={getControlItem.placeholder}
                        value={formData[getControlItem.name] || ""}
                        onChange={(e) => setFormData({ ...formData, [getControlItem.name]: e.target.value })}
                    />
                );
                break;

            default:
                element = (
                    <Input
                        id={getControlItem.name}
                        name={getControlItem.name}
                        placeholder={getControlItem.placeholder}
                        type={getControlItem.type}
                        value={formData[getControlItem.name] || ""}
                        onChange={(e) => setFormData({ ...formData, [getControlItem.name]: e.target.value })}
                    />
                );
                break;
        }

        return element;
    }

    return ( 
        <div className="flex flex-col gap-3">
            {formControls.map(controlItem => (
                <div key={controlItem.name}>
                    <Label htmlFor={controlItem.name}>{controlItem.label}</Label>
                    {renderComponentByType(controlItem)}
                </div>
            ))}
        </div>
    );
}

export default FormControls;
