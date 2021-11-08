package pfc.WebAPI.Infraestructura.Entidades.Enumerables;

import java.util.HashMap;
import java.util.Map;

public enum EstadoFrontMP {
    EXITOSO(1),PENDIENTE(2),ERROR(3);

    private final int value;
    private static Map map = new HashMap<>();

    private EstadoFrontMP(int value) {
        this.value = value;
    }

    static {
        for (EstadoFrontMP estado : EstadoFrontMP.values()) {
            map.put(estado.value, estado);
        }
    }

    public static EstadoFrontMP valueOf(int value) {
        return (EstadoFrontMP) map.get(value);
    }

    public int getValue() {
        return value;
    }
}
