package gov.iti.jets.configs;

import gov.iti.jets.models.entities.User;
import jakarta.persistence.PrePersist;
import org.springframework.stereotype.Component;

import java.util.Date;

@Component
public class UserListener {

    @PrePersist
    public void beforeInsert(User user) {

        user.setIsAdmin(false);
        user.setIsDeleted(false);
    }
}
