package pfc.WebAPI.Infraestructura.Entidades.Enumerables;

import java.util.HashMap;
import java.util.Map;

public enum TipoImpresion {
	SIMPLE(1),DOBLE(2);

private final int value;
private static Map map = new HashMap<>();

private TipoImpresion(int value) {
    this.value = value;
}

static {
    for (TipoImpresion tipo : TipoImpresion.values()) {
        map.put(tipo.value, tipo);
    }
}

public static TipoImpresion valueOf(int tipo) {
    return (TipoImpresion) map.get(tipo);
}

public int getValue() {
    return value;
}
}
