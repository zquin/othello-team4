package com.allstate.compozed.othello.repository;

import com.allstate.compozed.othello.domain.game.GameBoard;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

/**
 * Created by localadmin on 4/4/17.
 */
public interface GameBoardRepository extends CrudRepository <GameBoard,Long>{

    public List<GameBoard> findAllByUserId (Long userId);
}
