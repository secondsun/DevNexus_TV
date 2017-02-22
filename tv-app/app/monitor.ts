export class Monitor {
    id: string;
    name: string;
    fcm_token: string;
    state: string;
    key: string;
    
    public static deserialize(json) : Monitor {
        return  {
            fcm_token: json.fcm_token, id: json.id, name: json.name, state: json.state, key: json.key 
        };
    }

}